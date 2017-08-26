console.log('Loaded!');
var image=document.getElementById('madi');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    image.style.marginLeft=marginLeft+'px';
}
image.onclick= function(){
  var interval=setInterval(moveRight,50);  
    
};