Sub SortForNetSuiteData()
'
' SortForNetSuiteData Macro
'

'
    Range("A18").Select
    Range(Selection, Selection.End(xlDown)).Select
    Range("A18:T11235").Select
    ActiveWorkbook.Worksheets("ForNetSuiteData").Sort.SortFields.Clear
    ActiveWorkbook.Worksheets("ForNetSuiteData").Sort.SortFields.Add Key:=Range( _
        "T18:T11235"), SortOn:=xlSortOnValues, Order:=xlDescending, DataOption:= _
        xlSortNormal
    With ActiveWorkbook.Worksheets("ForNetSuiteData").Sort
        .SetRange Range("A18:T11235")
        .Header = xlGuess
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
    End With
    Range("A18").Select
End Sub