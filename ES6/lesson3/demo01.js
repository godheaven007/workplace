// ES5
// var _html += '<li class="expandable">' +
//              '<div class="treeBtn"></div>' +
//              '<div class="treeText" id="'+ data.id +'" pid="'+ data.pid +'">'+ data.name +
//                  '<span class="treeAddBtn" type="1" id="'+ data.id +'" pid="'+ data.pid +'">添加</span>' +
//              '</div>' +
//              '<ul>';
//                  _html += _this.treeProduce(data['children']);
//              // 区域与学校同级
//              if(data['school'].length) {
//                  data['school'].forEach(function(obj, index) {
//                      _html += '<li>' +
//                          '<div class="treeText" is_school="1" id="'+ obj.id +'" pid="'+ obj.pid +'">'+ obj.name +
//                          '</div>' +
//                          '</li>';
//                  });
//              }
//                  _html +='</ul></li>';


// 用法(大括号中可以是表达式或函数)
{
  let name = "world";
  let template = `hello ${name}`;
  // let dom = `<ul>
  //     <li>${}</li>
  //     <li>${}</li>
  //     <li>${}</li>
  // </ul>`;
  console.log(template);
}

// 模板字符串嵌套
{
  const tmpl = addrs => `
    <ul>${addrs.map(addr => `
      <li><span>${addr.first}</span><span>${addr.last}</span></li>`).join('')}
    </ul>
  `;

  // function tmpl(addrs){
  //   var html = '<ul>';
  //   var newAddrs = addrs.map(function(item){
  //     return '<li><span>' + item.first + '</span><span>' + item.last + '</span></li>';
  //   });
  //   html += newAddrs.join('') + '</ul>';
  //   return html;
  // }
  
  const data = [
      { first: 'Jane', last: 'Bond' },
      { first: 'Lars', last: 'Croft' },
  ];

  console.log(tmpl(data));
}