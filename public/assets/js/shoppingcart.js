var app = new Vue({
    el:'#app',
    data:{
        itemList:[
          {
            id:'1',
            itemName:'A',
            imgUrl:'https://unsplash.com/photos/ed5AHZlDaqo',
            price:'500',
            count:'2'
          },
          {
            id:'2',
            itemName:'B',
            imgUrl:'https://unsplash.com/photos/ed5AHZlDaqo',
            price:'790',
            count:'3'
          },
          {
            id:'3',
            itemName:'C',
            imgUrl:'https://unsplash.com/photos/ed5AHZlDaqo',
            price:'1200',
            count:'1'
          },
          {
            id:'4',
            itemName:'D',
            imgUrl:'https://unsplash.com/photos/ed5AHZlDaqo',
            price:'2300',
            count:'1'
          },
    ]
    },
    methods:{
        handlePlus: function(item){
            item.count++;
        },
        handleSub: function(item){
            if(item.count>1){
            item.count--;                
            }
        },
        handledelete: function(index){
            console.log(this);
            this.itemList.splice(index,1);
        }
    },
    computed:{

    }
})