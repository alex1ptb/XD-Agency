function updateTotalPadHours() {
  //target array of all pad hours
  let padHours = [];
  let padPay = [];
  //grab all named ranges that end in '_Roles'
  let roles = ss
    .getNamedRanges()
    .filter((namedRange) => namedRange.getName().endsWith("_Roles"));
  //get the values of each range
  roles.forEach((role) => {
    let range = role.getRange();
    let values = range.getValues();
    //push the values to the padHours array
    values.forEach((value) => {
      //if named range has XD in it, then look up pay rate
      if (role.getName().includes("XD")) {
        let name = value[1];
        let employeePay = lookUpPayRate(name);
        //multiply pay rate by negative of pad hours
        let totalPad = employeePay * -value[12];
        padPay.push(totalPad);
      }
      //if named range has Freelancer in it, then get the pay rate from the range
      if (role.getName().includes("Freelancer")) {
        let totalPad = value[12] * -value[4];
        padPay.push(totalPad);
      }
      //if value[12] is a number push it to the array
      if (typeof value[12] === "number") {
        padHours.push(value[12]);
      }
    });
  });
  padHours = padHours.reduce((a, b) => a + b, 0);
  padPay = padPay.reduce((a, b) => a + b, 0);
  ss.getRangeByName("JobFinancialForm_TotalPadHours").setValue(padHours);
  ss.getRangeByName("JobFinancialForm_TotalPadCost").setValue(padPay);
}
