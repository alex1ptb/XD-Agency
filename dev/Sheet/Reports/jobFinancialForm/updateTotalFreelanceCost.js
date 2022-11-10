//update total freelance cost by grabbing all named ranges that end in _Freelancer_SubTotalCost and adding them together
function updateTotalFreelanceCostOnJobFinancialForm() {
  let totalFreelanceCost = 0;
  let namedRanges = ss.getNamedRanges();
  for (let i = 0; i < namedRanges.length; i++) {
    let namedRange = namedRanges[i];
    if (namedRange.getName().endsWith("_Freelancer_SubTotalCost")) {
      totalFreelanceCost += namedRange.getRange().getValue();
    }
  }
  ss.getRangeByName("JobFinancialForm_Freelance_TotalCost")
    .setValue(totalFreelanceCost)
    .setNumberFormat("$#,##0.00");
}
