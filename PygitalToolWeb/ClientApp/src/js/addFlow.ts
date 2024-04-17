import {addQuestion} from "../js/addQuestion"
const FlowTypeEnum = {
    Circular: 0,
    Linear: 1
};
class Flow{
    public description: string;
    public FlowName: string;
    public FlowType: number;
    

    constructor(description: string, flowName: string,flowType: number) {
        this.description = description;
        this.FlowName = flowName;
        this.FlowType = flowType;

    }
}


console.log('The addFLow.ts script bundle has been loaded!');

document.getElementById('add-Flow-button')?.addEventListener('click', () => {
    console.log('Add button has been pressed!');
    const FlowContainer = document.getElementById('flow-container');
    if (FlowContainer) {
        FlowContainer.innerHTML = `
            <h2 class="mt-4">Add New Flow</h2>
            <form id="new-flow-form">
                <div class="mb-3">
                    <label for="flowName" class="form-label">Flow name</label>
                    <input type="text" class="form-control" id="flowName" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" required></textarea>
                </div>
                <div class="mb-3">
                     <label class="form-label">Flow Type</label>
                         <div class="form-check">
                              <input class="form-check-input" type="radio" name="flowType" id="circularFlow" value="Circular">
                              <label class="form-check-label" for="circularFlow"> Circulair </label>
                         </div>
                         <div class="form-check">
                              <input class="form-check-input" type="radio" name="flowType" id="linearFlow" value="Linear">
                              <label class="form-check-label" for="linearFlow"> Lineair</label>
                         </div>
                         
                </div>
                <div class="mb-3">
                          <div id="questions">
                                     <!-- Here question rows will be added -->
                          </div>
                          <button type="button" id="add-question-button" >Add Question</button>
                </div>
                <button type="submit" class="btn btn-primary">Add Flow</button>
                <button type="button" class="btn btn-secondary" id="cancel-button">Cancel</button>
            </form>
        `;

        const scriptElement = document.getElementById('Flow-script');
        const subthemeId = scriptElement?.getAttribute('data-subtheme-id');
        
        document.getElementById('add-question-button')?.addEventListener('click', addQuestion);
        document.getElementById('cancel-button')?.addEventListener('click', loadFlows);
        document.getElementById('new-flow-form')?.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log("S button geduwt")
            const flowNameInput = document.getElementById('flowName') as HTMLInputElement;
            const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
            const flowTypeRadio = document.querySelector('input[name="flowType"]:checked') as HTMLInputElement;
            const flowType = flowTypeRadio.value === 'Circular' ? FlowTypeEnum.Circular : FlowTypeEnum.Linear;
            if (!flowNameInput || !descriptionInput || !flowTypeRadio) return;

            const flowName = flowNameInput.value;
            const description = descriptionInput.value;
            

            //EERST ZORGEN DA DE FLOW GEADD WORD, DAN DE VRAGEN MEE GEADD WORD EN DAN DE ANSWERPOS
           
           console.log(flowName);
           console.log(description);
           console.log(flowType);
           console.log(subthemeId);
           
          
            // Create a new flow instance
            const newFlow = new Flow(description, flowName, flowType);

            const response = await fetch('/api/FlowCreation/AddFlowToSubtheme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FlowName: newFlow.FlowName,
                    FlowDescription: newFlow.description,
                    FlowType: newFlow.FlowType,
                    SubthemeId: subthemeId,
                    Questions: []
                })
            });
            if (response.ok) {
               loadFlows();
                
            } else {
                let errorMessage = 'Failed to add flow';
                if (response.status === 400) {
                    errorMessage = 'Fill all data!';
                } else if (response.status === 404) {
                    errorMessage = 'Not Found';
                } else if (response.status === 409) {
                    errorMessage = 'Conflict - Key exists already';
                } else if (response.status === 500) {
                    errorMessage = 'Internal Server Error';
                }
                alert(errorMessage);
            }
        });
    }
});

function loadFlows() {
    window.location.reload();
    
}

