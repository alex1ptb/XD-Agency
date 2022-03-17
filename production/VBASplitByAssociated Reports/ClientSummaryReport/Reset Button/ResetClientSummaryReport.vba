Sub ResetClientSummaryReport()
'
' ResetClientSummaryReport Macro
'

'
    Range("A7").Select 'select the first row
    Range(Selection, Selection.End(xlDown)).Select ' select the last row
    Range("A7:R11225").Select ' select the range
    ActiveWorkbook.Worksheets("ClientSummaryReport").Sort.SortFields.Clear ' clear the sort fields in the ClientSummaryReport worksheet 
    'SortFields does what it sounds like. It clears the sort fields in the ClientSummaryReport worksheet.
    ActiveWorkbook.Worksheets("ClientSummaryReport").Sort.SortFields.Add Key:= _ ' add the sort field and set the key to the first column (A) 
        Range("A7:A11225"), SortOn:=xlSortOnValues, ' sort on values in the first column (A)
        Order:=xlAscending, ' sort in ascending order 
        DataOption _ ' set the data option to xlSortNormal
        :=xlSortNormal ' sort normal
    With ActiveWorkbook.Worksheets("ClientSummaryReport").Sort ; ' sort the range
        .SetRange Range("A7:R11225") ' set the range
        .Header = xlGuess ' guess the header
        .MatchCase = False ' match case
        .Orientation = xlTopToBottom ' top to bottom
        .SortMethod = xlPinYin ' sort method
        .Apply ' apply
    End With ' end with
    Range("A7").Select ' select the first row
End Sub

