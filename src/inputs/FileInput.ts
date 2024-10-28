import Dropzone from "dropzone";

export class FileInput {
  isDisabled: boolean = false;
  inputElement?: HTMLInputElement;
  errorMsgElement?: HTMLElement;
  dropzone?: Dropzone;
  validator?: (value?: FileList) => boolean;

  constructor({
    inputElement,
    errorMsgElement,
    validator,
    onInput,
  }: {
    inputElement?: HTMLInputElement;
    errorMsgElement?: HTMLElement;
    validator?: (value?: FileList) => boolean;
    onInput?: (value?: FileList) => void;
  }) {
    this.isDisabled = inputElement === null;
    if (this.isDisabled) return;

    this.inputElement = inputElement;
    this.errorMsgElement = errorMsgElement;
    this.validator = validator;

    if (onInput) {
      inputElement?.addEventListener("input", (e) =>
        onInput((e.target as HTMLInputElement).files || undefined)
      );
    }

    // Dropzone
    const isDropzone = inputElement?.getAttribute("data-bhwf-dropzone") !== null;
    if (inputElement && isDropzone) {
      const dropzone = createDropzone(inputElement);
      this.dropzone = dropzone;
    }
  }

  validate = (): boolean => this.validator?.(this.getValue()) ?? true;
  getValue = (): FileList | undefined =>
    this.inputElement !== undefined ? this.inputElement.files || undefined : undefined;
  reset = () => {
    if (this.inputElement !== undefined) this.inputElement.value = "";
    if (this.dropzone !== undefined) this.dropzone.removeAllFiles();
  };
}

const createDropzone = (inputElement: HTMLInputElement) => {
  inputElement.style.display = "none";
  const dropzoneElement = document.createElement("form");
  dropzoneElement.classList.add("dropzone");
  inputElement.parentElement?.insertBefore(dropzoneElement, inputElement.nextSibling);
  const acceptedFiles = inputElement.getAttribute("accept") || undefined;

  const dropzone = new Dropzone(dropzoneElement, {
    url: "#",
    autoProcessQueue: false,
    addRemoveLinks: true,
    acceptedFiles,
  });

  const _syncFileInputFiles = () => {
    if (inputElement) {
      const fileList = new DataTransfer();
      dropzone.files.forEach((file) => fileList.items.add(file));
      inputElement.files = fileList.files;
      inputElement.dispatchEvent(new Event("input"));
    }
  };

  dropzone.on("addedfile", (file) => {
    dropzone.emit("complete", file);
    _syncFileInputFiles();
  });
  dropzone.on("queuecomplete", (file) => _syncFileInputFiles());
  dropzone.on("removedfile", (file) => _syncFileInputFiles());

  return dropzone;
};
