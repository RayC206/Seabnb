import React from "react";
import { Modal } from "../../context/Modal";
import ImageForm from "./ImageForm.js";

function ImageFormModal({ isOpen, modalToggle }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => modalToggle(false)}>
          <ImageForm modalToggle={modalToggle} />
        </Modal>
      )}
    </>
  );
}

export default ImageFormModal;
