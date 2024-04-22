import bootstrap from "bootstrap";
import { loadFlows } from "./addFlow";
document.addEventListener('DOMContentLoaded', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal === null || confirmationModal === void 0 ? void 0 : confirmationModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const FlowId = button.getAttribute('data-flow-id');
        const confirmDeleteButton = document.getElementById('delete-confirm');
        console.log("Modal shown, flow ID:", FlowId);
        confirmDeleteButton.onclick = () => {
            if (FlowId) {
                deleteFlow(parseInt(FlowId));
                const modalInstance = bootstrap.Modal.getInstance(confirmationModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        };
    });
});
function deleteFlow(FlowId) {
    fetch(`/api/FlowCreation/DeleteFlow${FlowId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Flow deleted successfully');
            loadFlows();
        }
        else {
            console.error('Failed to delete Flow');
            return response.text().then(text => Promise.reject(text));
        }
    });
}
