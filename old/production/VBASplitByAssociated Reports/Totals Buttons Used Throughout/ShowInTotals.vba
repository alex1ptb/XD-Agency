'Original VBA Code
Sub ShowInTotals()
'
' ShowInTotals Macro
'

'
    Range("AA20:AA217").Select 'Select cells in range. This range is the range of totals that can either be shown or hidden. 
    Selection.Copy 
    Range("E20").Select
    Selection.PasteSpecial Paste:=xlPasteValues, Operation:=xlNone, SkipBlanks _
        :=False, Transpose:=False 'keeps the formatting of the copied range intact and pastes it into the new range E20 to E217 (the range of totals) 
        Range("AA20").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA44").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA68").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA92").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA117").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA143").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA170").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA196").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AA220").Select
        ActiveWindow.LargeScroll Down:=1
    Range("AA236:AA838").Select
    Application.CutCopyMode = False
    Selection.Copy
    Range("F236").Select
    Selection.PasteSpecial Paste:=xlPasteValues, Operation:=xlNone, SkipBlanks _
        :=False, Transpose:=False
    Range("AB20:AB838").Select
    Application.CutCopyMode = False
    Selection.Copy
    Range("AA20").Select
    ActiveSheet.Paste
    Range("D8").Select
    Application.CutCopyMode = False
    Selection.ClearContents
    Range("D6").Select
    ActiveCell.FormulaR1C1 = "< ON"
    Range("B12").Select
End Sub
'End of Original VBA Code
