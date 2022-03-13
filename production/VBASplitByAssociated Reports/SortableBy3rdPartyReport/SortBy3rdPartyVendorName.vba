Sub SortBy3rdPartyVendorName()
'
' SortBy3rdPartyVendorName Macro
'

'
    Range("A6:R6").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("R7:R8844"), SortOn:=xlSortOnValues, Order:=xlDescending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("F7:F8844"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort
        .SetRange Range("A6:R8844")
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("F6").Select
End Sub