// components/FontAwesomeIcons.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

export const EditIcon = () => <FontAwesomeIcon icon={faEdit} />;
export const DeleteIcon = () => <FontAwesomeIcon icon={faTrash} />;
export const ViewIcon = () => <FontAwesomeIcon icon={faEye} />;
