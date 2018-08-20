export function hex2RGB(color){
    if(color.substr(0,1)=="#")color=color.substring(1);
    if(color.length!=6)return alert("请输入正确的十六进制颜色码！");
    color=color.toLowerCase()
    var b=new Array();
    for(x=0;x<3;x++){
        b[0] = color.substr(x*2, 2);
        b[1] = b[0].substr(0, 1);
        b[2] = b[0].substr(1, 1);
        b[3] = "0123456789abcdef";
        b[20+x] = b[3].indexOf(b[1])*16+b[3].indexOf(b[2])
    }
    return b[20]+","+b[21]+","+b[22];
}
/**
 * 
 * 
 * 
 *                 background-image: -webkit-linear-gradient(top, red, blue);
                background-image: -moz-linear-gradient(top, red, blue);
                background-image: -o-linear-gradient(top, red, blue);
                background-image: linear-gradient(top, red, blue);

     background-image: -webkit-gradient(linear, left top, right top, from(red), to(blue));
    background-image: -webkit-linear-gradient(left, red, blue);
    background-image: -o-linear-gradient(left, red, blue);
    background-image: linear-gradient(left, red, blue);
 */