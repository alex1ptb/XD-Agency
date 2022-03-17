Sub SortBy3rdPartyDescription1()
'
' SortBy3rdPartyDescription1 Macro
'

'
    Range("A7:R7").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("R7:R8844"), SortOn:=xlSortOnValues, Order:=xlDescending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort.SortFields.Add Key _
        :=Range("D7:D8844"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("SortableBy3rdPartyReport").Sort
        .SetRange Range("A7:R8844")
        .Header = xlGuess
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("A7").Select
End Sub