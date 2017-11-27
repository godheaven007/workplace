let name = "allen";
let say = () => console.log(111);

let obj = {
	name,
	say() {
		console.log(123);
	}
}

console.log(obj.name, obj.say());