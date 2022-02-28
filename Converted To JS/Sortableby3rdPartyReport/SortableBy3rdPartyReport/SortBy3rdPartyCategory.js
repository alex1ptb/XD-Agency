function SortBy3rdPartyCategory(){
// '
// ' SortBy3rdPartyCategory Macro
// '

// '
    ss = SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.getSheetByName("SortableBy3rdPartyReport");
    range = sheet.getRange("A7:R8844");
    range.Sort([{
        column: 
    }])


    Range("A7:R7").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("R7:R8844"), SortOn:=xlSortOnValues, Order:=xlDescending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("C7:C8844"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort
        .SetRange Range("A6:R8844")
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("A7").Select
}