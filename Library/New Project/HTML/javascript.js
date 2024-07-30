//NOTE: Currently inside of HTML

function getDeliverableNames() {
  const deliverableCount = document.getElementById("deliverableCount").value;
  let deliverableNames = [];
  for (let i = 1; i <= deliverableCount; i++) {
    deliverableNames.push(document.getElementById("deliverable" + i).value);
  }
  return deliverableNames;
}

function showDeliverableInputs(html) {
  document.getElementById("deliverableInputs").innerHTML = html;
}
