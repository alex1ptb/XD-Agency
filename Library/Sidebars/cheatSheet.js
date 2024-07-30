function cheatSheetSidebar() {
  const data = getCheatSheetData();
  const htmlContent = buildAccordionHtml(data);

  const html = HtmlService.createHtmlOutput(htmlContent)
    .setTitle("Data Accordion")
    .setWidth(450);

  SpreadsheetApp.getUi().showSidebar(html);
}

function getCheatSheetData() {
  const sheet = SpreadsheetApp.openById(DATABASE_SS_ID).getSheetByName(
    "Third Party Cheat Sheet"
  ); // Change 'Sheet1' to your sheet name
  const data = sheet.getDataRange().getValues();
  // slice top
  return data;
}

function buildAccordionHtml(data) {
  let html = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
        }

        #accordion {
          width: 100%;
        }

        .accordion {
          background-color: #0288d1;
          color: #fff;
          cursor: pointer;
          padding: 15px;
          width: 100%;
          text-align: left;
          border: none;
          outline: none;
          transition: 0.4s;
          font-size: 16px;
          margin-top: 5px;
          border-radius: 5px;
        }

        .active, .accordion:hover {
          background-color: #0277bd;
        }

        .panel {
          padding: 0 18px;
          display: none;
          background-color: white;
          overflow: hidden;
          margin-bottom: 5px;
          border-left: 4px solid #0288d1;
          border-radius: 0 0 5px 5px;
        }

        .nested-panel {
          padding-left: 0;
          border-left: 0;
        }

        .level-0 .accordion {
          background-color: #0288d1;
        }

        .level-1 .accordion {
          background-color: #039be5;
        }

        .level-0.active, .level-0 .accordion:hover,
        .level-1.active, .level-1 .accordion:hover {
          background-color: #0277bd;
        }

        .search-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          box-sizing: border-box;
        }
      </style>
    </head>
    <body>
      <input type="text" id="search" placeholder="Search..." class="search-input">
      <div id="accordion">`;

  let currentCategory = "";

  data.forEach((row, rowIndex) => {
    if (rowIndex === 0) return; // Skip header row

    const nsCode = row[row.length - 1]; // Last column is NS Code
    const levels = row.slice(0, row.length - 1); // All columns except the last

    if (levels[0] !== currentCategory) {
      if (currentCategory) {
        html += `</div></div>`; // Close previous category accordion
      }
      currentCategory = levels[0];
      html += `<div class="level-0"><button class="accordion">${currentCategory} - NS Code: ${nsCode}</button><div class="panel nested-panel">`;
    }

    if (levels[1]) {
      html += `<div class="level-1"><button class="accordion">${levels[1]} - NS Code: ${nsCode}</button><div class="panel nested-panel">NS Code: ${nsCode}</div></div>`;
    }
  });

  html += `</div></div></div>`; // Close the last category and its panel
  html += `
      </div>
      <script>
        document.addEventListener('DOMContentLoaded', function () {
          var acc = document.getElementsByClassName("accordion");
          for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.display === "block") {
                panel.style.display = "none";
              } else {
                panel.style.display = "block";
              }
            });
          }

          document.getElementById('search').addEventListener('input', function () {
            const filter = this.value.toLowerCase();
            const accordions = document.querySelectorAll('#accordion .accordion');
            const panels = document.querySelectorAll('#accordion .panel');

            accordions.forEach(accordion => {
              const panel = accordion.nextElementSibling;
              if (accordion.textContent.toLowerCase().includes(filter)) {
                accordion.style.display = '';
                let parent = accordion;
                while ((parent = parent.parentElement.closest('.panel'))) {
                  parent.style.display = '';
                  parent.previousElementSibling.style.display = '';
                  parent.previousElementSibling.classList.add('active');
                  parent.style.display = 'block';
                }
              } else {
                accordion.style.display = 'none';
                panel.style.display = 'none';
              }
            });
          });
        });
      </script>
    </body>
    </html>`;

  return html;
}

function buildNestedAccordion(levels, nsCode, level) {
  if (levels.length === 0) {
    return `<div>NS Code: ${nsCode}</div>`;
  }

  const currentLevel = levels[0];
  const nextLevels = levels.slice(1);

  return `
    <div class="level-${level}">
      <button class="accordion">${currentLevel}</button>
      <div class="panel nested-panel">
        ${buildNestedAccordion(nextLevels, nsCode, level + 1)}
      </div>
    </div>`;
}
