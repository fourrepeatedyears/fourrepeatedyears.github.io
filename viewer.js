var canvas_x = -200;
var canvas_y = 0;

function canvas_get_next_x() {
	canvas_x += 200;
	return canvas_x;
}

function canvas_get_y(input_x) {
	var a = -0.000304;
	var x = input_x - 480;
	var b = 120;
	var y = a * x * x + b;
	return y;
}

function move(image_array, direction) {
	for (i = 0 ; i < image_array.length ; i ++ ) {
		my_img = image_array[i];
		if (direction < 0) {
            new_x = my_img.x - 200;
		} else {
			new_x = my_img.x + 200;
		}
        new_y = canvas_get_y(new_x);
        translate_x = new_x - my_img.x;
        translate_y = new_y - my_img.y;
        my_img.r_img.animate({transform: "t" + translate_x + "," + translate_y}, 1000, "<>");
	}
}

window.onload = function () {
	var image_array = new Array();
	var i = 0;
	for (i = 0 ; i < 6 ; i ++) {
		my_img = new Object();
		my_img.img = new Image();
		my_img.img.src = document.getElementById("img" + i).src;
		my_img.x = canvas_get_next_x();
		my_img.y = canvas_get_y(my_img.x);
		my_img.sx = 1;
		my_img.sy = 1;
		image_array[i] = my_img;
	}

    document.getElementById("holder").innerHTML = "";
    var R = Raphael("holder", 960, 480);
    
	for (i = 0 ; i < 6 ; i ++) {
		my_img = image_array[i];
		my_img.r_img = R.image(my_img.img.src, my_img.x, my_img.y, 160, 120);
	}

    var image_width = 160;
    var canvas_width = 960;
    var butt1 = R.set(),
        butt2 = R.set();
    butt1.push(R.circle(24.833, 26.917, 26.667).attr({stroke: "#ccc", fill: "#fff", "fill-opacity": .4, "stroke-width": 2}),
               R.path("M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z").attr({stroke: "none", fill: "#000"}),
               R.circle(24.833, 26.917, 26.667).attr({fill: "#fff", opacity: 0}));
    butt2.push(R.circle(24.833, 26.917, 26.667).attr({stroke: "#ccc", fill: "#fff", "fill-opacity": .4, "stroke-width": 2}),
               R.path("M37.566,9.551c9.331,6.686,11.661,19.471,5.502,29.014l2.36,1.689l-4.893,2.262l-4.893,2.262l0.568-5.36l0.567-5.359l2.365,1.694c4.657-7.375,2.83-17.185-4.352-22.33c-7.451-5.338-17.817-3.625-23.156,3.824C6.3,24.695,8.012,35.06,15.458,40.398l-2.857,3.988C2.983,37.494,0.773,24.109,7.666,14.49C14.558,4.87,27.944,2.658,37.566,9.551z").attr({stroke: "none", fill: "#000"}),
               R.circle(24.833, 26.917, 26.667).attr({fill: "#fff", opacity: 0}));
    butt1.translate(10, 181);
    butt2.translate(10, 245);
    butt1[2].click(function () {
        /*image_middle_x = x + image_width / 2;
        if (image_middle_x >= canvas_width / 2) {
        	sx *= 1.2;
        	sy *= 1.2;
        } else {
        	sx *= 0.8;
        	sy *= 0.8;
        }
        image_width = image_width * sx;
        x -= 100;
        img.animate({transform: "t" + x + ",0 s" + sx + "," + sy + ",0,0"}, 1000, "<>");*/
        move(image_array, -1);
        //img.stop().animate({transform: "r" + angle}, 1000, "<>");
    }).mouseover(function () {
        butt1[1].animate({fill: "#fc0"}, 300);
    }).mouseout(function () {
        butt1[1].stop().attr({fill: "#000"});
    });
    butt2[2].click(function () {
        /*image_middle_x = x + image_width / 2;
        if (image_middle_x >= canvas_width / 2) {
        	sx *= 0.8;
        	sy *= 0.8;
        } else {
        	sx *= 1.2;
        	sy *= 1.2;
        }
        image_width = image_width * sx;
        x += 100;
        img.animate({transform: "t" + x + ",0 s" + sx + "," + sy + ",0,0"}, 1000, "<>");*/
        //img.animate({transform: "r" + angle}, 1000, "<>");
        move(image_array, 1);
    }).mouseover(function () {
        butt2[1].animate({fill: "#fc0"}, 300);
    }).mouseout(function () {
        butt2[1].stop().attr({fill: "#000"});
    });
    
    R.path("M 0,0 a 480,120 0 1,0 0,-50");
    // setTimeout(function () {R.safari();});
};