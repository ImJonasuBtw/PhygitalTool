// Generates HTML markup for displaying notes in the projects container.
export function NotesHtml(projectsContainer: HTMLElement) {
    const backofficeId = projectsContainer.getAttribute('backoffice-id');
    projectsContainer.innerHTML = `
    <div class="row">
                    <div class="m-2">
                        <div class="card clickable" data-project-id="@project.ProjectId" data-href="@Url.Action("Index", "Projects", new { projectId = project.ProjectId })">
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex justify-content-between">
                                    <h5 class="card-title">Kies de juiste flow en bekijk daar de notities</h5>
                                </div>
                                <p class="card-text">Begin bij de projecten en ga verder tot de flow</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            
                `;
}