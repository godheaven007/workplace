{
	let x = 1;

	function f(y = x) {
	  let x = 2;
	  console.log(x,y);
	}

	f(3);
	f();
}