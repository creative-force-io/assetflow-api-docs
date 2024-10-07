window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: "prostudio-workflow-api.yaml",  // Your OpenAPI spec file
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    onComplete: function() {
      // Wait until Swagger UI has fully rendered
      setTimeout(function() {
        const spec = window.ui.specSelectors.specJson().toJS();
        const infoSection = document.querySelector(".info");

        if (!infoSection) {
          console.warn('Info section not found');
          return;
        }

        // Check if x-release-notes and x-changelog are present in the OpenAPI spec
        const releaseNotes = spec.info["x-release-notes"];
        const changelog = spec.info["x-changelog"];

        // Append Release Notes to the Info section if they exist
        if (releaseNotes) {
          const releaseNotesDiv = document.createElement('div');
          releaseNotesDiv.innerHTML = `<h4>Release Notes</h4><pre>${releaseNotes}</pre>`;
          infoSection.appendChild(releaseNotesDiv);
        }

        // Append Changelog to the Info section if it exists
        if (changelog) {
          const changelogDiv = document.createElement('div');
          changelogDiv.innerHTML = `
            <h4>Changelog</h4>
            <div>
              ${changelog.split('\n').map(line => {
                if (line.startsWith('###')) {
                  return `<h5>${line.replace('### ', '')}</h5>`;
                }
                return `<p>${line}</p>`;
              }).join('')}
            </div>`;
          infoSection.appendChild(changelogDiv);
        } else {
          console.warn('No changelog found');
        }
      }, 1000);  // Adjust timeout value if necessary
    }
  });

  //</editor-fold>
};
