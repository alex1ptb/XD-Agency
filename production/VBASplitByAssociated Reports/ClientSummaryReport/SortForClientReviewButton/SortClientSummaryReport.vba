'This macro runs from the button located on "Client Summary Report" Tab

Sub SortClientSummaryReport()
'
' SortClientSummaryReport Macro
'

'
    Range("B10").Select
    Sheets("SortableByServiceAreaReport").Select
    Range("A7:R7").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Add _
        Key:=Range("A8:A2387"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort
        .SetRange Range("A7:R2387")
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("B8").Select
    Sheets("SortableBy3rdPartyReport").Select
    Range("A6:Q6").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("A7:A8845"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort
        .SetRange Range("A6:Q8845")
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("B7").Select
    Sheets("ClientSummaryReport").Select
    Range("A7:R7").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("ClientSummaryReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("ClientSummaryReport").Sort.SortFields.Add Key:= _
        Range("R7:R11277"), SortOn:=xlSortOnValues, Order:=xlDescending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("ClientSummaryReport").Sort.SortFields.Add Key:= _
        Range("A7:A11277"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("ClientSummaryReport").Sort.SortFields.Add Key:= _
        Range("B7:B11277"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("ClientSummaryReport").Sort
        .SetRange Range("A7:R11277")
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("B10").Select
End Sub