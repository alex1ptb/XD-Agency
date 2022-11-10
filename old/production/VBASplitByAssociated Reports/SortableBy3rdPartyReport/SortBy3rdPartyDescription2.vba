Sub SortBy3rdPartyDescription2()
'
' SortBy3rdPartyDescription2 Macro
'

'
    Range("A7:R7").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("R7:R8844"), SortOn:=xlSortOnValues, Order:=xlDescending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("E7:E8844"), SortOn:=xlSortOnValues, Order:=xlAscending, _
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
End Sub