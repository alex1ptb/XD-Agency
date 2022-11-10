Sub DoNotShowInTotals()
'
' DoNotShowInTotals Macro
'

'
    Range("AA20:AA838").Select
    Selection.Copy
    Selection.PasteSpecial Paste:=xlPasteValues, Operation:=xlNone, SkipBlanks _
        :=False, Transpose:=False
    Range("AD20:AD217").Select
    Application.CutCopyMode = False
    Selection.Copy
    Range("E20").Select
    ActiveSheet.Paste
        Range("AE20").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE41").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE62").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE84").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE106").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE128").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE151").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE175").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE196").Select
        ActiveWindow.LargeScroll Down:=1
        Range("AE217").Select
        ActiveWindow.LargeScroll Down:=1
    Range("AD236:AD839").Select
    Application.CutCopyMode = False
    Selection.Copy
        Range("A12").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A32").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A53").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A75").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A97").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A119").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A142").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A166").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A189").Select
        ActiveWindow.LargeScroll Down:=1
        Range("A212").Select
        ActiveWindow.LargeScroll Down:=1
    Range("F236").Select
    ActiveSheet.Paste
    Range("D8").Select
    Application.CutCopyMode = False
    ActiveCell.FormulaR1C1 = "< ON"
    Range("D6").Select
    Selection.ClearContents
    Range("A13").Select
End Sub
