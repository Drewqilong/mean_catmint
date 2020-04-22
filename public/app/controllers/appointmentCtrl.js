angular.module('appointmentControllers', [])

//Shopping cart
.controller('appointmentCtrl', function($scope){


    
    //this js中指当前对象
    function add_shoppingcar(btn){
      var tr=btn.parentNode.parentNode;
      var tds=tr.getElementsByTagName("td");
      var name=tds[0].innerHTML;
      var price=tds[1].innerHTML;
      var tbody=document.getElementById("goods");
      var row=tbody.insertRow();//insertRow表格开头插入新行
      row.innerHTML="<td>"+name+"</td>"+
    "<td>"+price+"</td>"+
"<td align='center'>"+
    "<input type='button' value='-' id='jian'  onclick='change(this,-1)'  />"+
    "<input id='text' type='text' size='1' value='1' readonly='readonly' />"+
    "<input type='button' value='+' id='add'  onclick='change(this,1)'  />"+
    "</td>"+
    "<td>"+price+"</td>"+
    "<td align='center'>"+
      "<input type='button' value='X' onclick='del(this)'/>"+
    "</td>"+
    "</tr>"
    total();
    }
    //增加减少数量，用n正负1来表示点击了加减按钮
    function change(btn,n){
    //获取数量的三个input对象
    var inputs = btn.parentNode.getElementsByTagName("input");
    //获取原来的数量
    var amount = parseInt(inputs[1].value);
    //当amount=1时不能再点击"-"符号
    //用n<0来表示点击了减button
    if(amount<=1 && n<0){
  return;
    }
    //根据加减来改变数量
    inputs[1].value = amount + n;
    //将改变后的数量值赋值给amount
    amount = inputs[1].value;
    //获取表格中的行
    var tr = btn.parentNode.parentNode;
    //获取所有的列
    var tds = tr.getElementsByTagName("td");
    //获取单价
    var price = parseFloat(tds[1].innerHTML);
    //总价=单价*数量
    var m = price * amount;
    //将总价赋值给相应的位置
    tds[3].innerHTML = m;
    //调用total方法，求总计
    total();
  }

function total(){
      var tbody=document.getElementById("goods");
      var trs=tbody.getElementsByTagName("tr");
      var sum=0;
      for(var i=0;i<trs.length;i++){
        var tds=trs[i].getElementsByTagName("td");
        var m=tds[3].innerHTML;
        sum += parseFloat(m);
      }
      var total=document.getElementById("total");
      total.innerHTML = sum;
    }
    function del(i){
      var tr=i.parentNode.parentNode;
      tr.parentNode.removeChild(tr);
      //tr.remove(tr);
      total();
    }




})