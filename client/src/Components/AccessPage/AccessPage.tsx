import { Button, Modal } from "react-bootstrap";

interface AccessPageProps {
  message: string,
  show: boolean,
  setShow: (setShow:boolean) => void;
}
const AccessPage = ({message, show, setShow}:AccessPageProps) => {
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(false);

  return (
    <div>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>{message}</Modal.Header>
        <Modal.Body >
          <h1>Access denied.</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
}

export default AccessPage;