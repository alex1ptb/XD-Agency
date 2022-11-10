Sub SortByServiceAreaDeliverable()
'
' SortByServiceAreaDeliverable Macro
'

'
    Range("A7:P7").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Add _
        Key:=Range("P8:P2387"), SortOn:=xlSortOnValues, Order:=xlDescending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Add _
        Key:=Range("A8:A2387"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Add _
        Key:=Range("B8:B2387"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Add _
        Key:=Range("D8:D2387"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort
        .SetRange Range("A7:P2387")
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("B8").Select
End Sub