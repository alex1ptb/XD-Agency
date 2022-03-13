Sub ResetSortableByServiceArea()
'
' ResetSortableByServiceArea Macro
'

'
    Range("A7:P7").Select
    Range(Selection, Selection.End(xlDown)).Select
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort.SortFields.Add _
        Key:=Range("A8:A2387"), SortOn:=xlSortOnValues, Order:=xlAscending, _
        DataOption:=xlSortNormal
    With ActiveWorkbook.Worksheets("SortableByServiceAreaReport").Sort
        .SetRange Range("A7:P2387")
        .Header = xlYes
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("B5").Select
End Sub