const controller = {};
controller.convertArrayToRGB = (array, opacity) => {
    return `rgb(${array[0]}, ${array[1]}, ${array[2]}, ${opacity})`
}
controller.checkDecibelToCreateCrest = db => {
    if(db<=0.007) return 1
    else if(db<=0.01) return 2
    else if(db<=0.015) return 3 
    else if(db<=0.02) return 4 
    else if(db<=0.03) return 5 
    else if(db<=0.04) return 6 
    else if(db<=0.06) return 7 
    else if(db<=0.08) return 8 
    else if(db<=0.1) return 9 
    else return 10 
}