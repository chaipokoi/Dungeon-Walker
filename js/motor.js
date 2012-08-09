var surface=undefined;
var Xr=0;
var Yr=0;
var RoomList=new Array();
var player=undefined;
var Msgzone=new MsgZone(1,11);
var Interval=undefined;
var Phase=undefined;
var Select_index=1;
var Choice_page=0;
var Tour=0;
var DayInterval=144;
var TimeStat="Day";


window.onload = function() {
	surface = document.getElementById('canvas').getContext('2d');
	Interval=setInterval(function() {
		title();
	}, 20);
}

function title()
{
		Phase="title";
		if(typeof r=="undefined")
		{

			r=50;
			v=50;
			b=50;
			ratio=5;
			for(i=0;i<380;i++)
			{
				surface.font = "100px pixel";
				surface.fillStyle = "rgb("+r+","+v+","+b+")";
				surface.fillText("#",100*i, 150);
			}
		}
		clean();
		surface.font = "100px pixel";
		surface.fillStyle = "rgb("+r+","+v+","+b+")";
		surface.fillText("DUNGEON WALKER",40, 70);
		r+=ratio;
		v+=ratio;
		b+=ratio;

		if(r>255)
		{
			ratio=-5;
		}
		if(r<50)
		{
			ratio=5;
		}

		surface.font = "50px pixel";
		surface.fillStyle = "rgb(150,150,150)";
		surface.fillText("Nouvelle exploration",100, 150+70*1);
		surface.fillText("Reprendre une exploration",100, 150+70*2);
		surface.fillText("Credits",100, 150+70*3);
		
		if(Select_index>3)
			Select_index=1;

		
		if(Select_index<1)
			Select_index=3;
		surface.fillText(">",80, 150+70*Select_index);
}


function createPlayer()
{
	Phase="createPlayer";
	clean();
	surface.font = "50px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("Creation d'un personnage",100, 50);
	surface.font = "32px pixel";
	surface.fillStyle = "rgb(150,150,150)";
	surface.fillText("Selection de la Classe",32, 110);

	for(i=0;i<Class.length;i++)
	{
		surface.fillText(Class[i].Name,52, 110+52*(i+1));	
	}
		if(Select_index>Class.length-1)
			Select_index=0;

		
		if(Select_index<0)
			Select_index=2;

		surface.fillText(">",16, 110+52*(Select_index+1));



	surface.fillRect (608-250-50,70,300,16);
	surface.fillRect (608-266-50,70+16,16,520);

		if(Choice_page>1)
			Choice_page=0;

		
		if(Choice_page<0)
			Choice_page=1;

	if(Choice_page==0)
	{
		surface.fillText("Apercu",608-266+32, 70+48);
		surface.fillStyle = "rgb(50,150,50)";
		surface.fillText(Class[Select_index].Img,608-266+32, 70+48+32);
		surface.fillStyle = "rgb(150,150,150)";
		surface.fillText("Vie Bonus Maximum",608-266+32, 70+48+32+48);
		surface.fillStyle = "rgb(150,50,255)";
		surface.fillText((Class[Select_index].Lrm*6),608-266+32, 70+48+32+48+32);
		surface.fillStyle = "rgb(150,150,150)"
		surface.fillText("Multiplicateur de stats",608-266+32, 70+48+32+48+32+48);
		surface.fillStyle = "rgb(50,50,255)";
		surface.fillText("For: X"+(Class[Select_index].For),608-266+32, 70+48+32+48+32+48+32);
		surface.fillText("Con: X"+(Class[Select_index].Con),608-266+32, 70+48+32+48+32+48+32+32);
		surface.fillText("Tai: X"+(Class[Select_index].Tai),608-266+32, 70+48+32+48+32+48+32+32+32);
		surface.fillText("Dex: X"+(Class[Select_index].Dex),608-266+32, 70+48+32+48+32+48+32+32+32+32);
	}
	else
	{
		surface.font = "20px pixel";
		surface.fillStyle = "rgb(150,150,150)"
		word=Class[Select_index].Desc.split("");
		y=0;
		x=0;
		flag=11;
		for (i=0;i<word.length;i++)
		{
			if(i>flag && word[i]==" ")
			{
				y+=1;
				flag+=20;
				x=0;
			}
			x+=1;
			surface.fillText(word[i],608-266-50+32+x*10, 70+48+y*32);
		}
	}
}


function createRoom(top,left,down,right)
{
	RoomList[Xr*100+Yr]=new Room(top,left,down,right);
}

function clean()
{
	surface.fillStyle="rgb(0,0,0)";
	surface.fillRect (0, 0,document.getElementById('canvas').width,document.getElementById('canvas').height);
}

function game()
{
	
	clean();
	//affichage des infos 
	Msgzone.draw();
	//dessin de la salle
	RoomList[Xr*100+Yr].draw();
	player.draw();
}

function action()
{	
	Tour+=1;
	if (Tour>=player.hi)
	{
		player.hi+=Tour;
		player.heal();	
		Msgzone.add("Vos blessures cicatrisent peu a peu...");
	}
	if (Tour>=player.fi)
	{
		player.fi+=Tour;
		player.fire();	
	}
	if (Tour>=player.si)
	{
		player.si+=Tour;
		player.sick();	
	}


	if(Tour>=DayInterval)
	{
		if(TimeStat=="Day")
		{
		player.changeStat();
		Msgzone.add("La luminositee diminue peu a peu...");
		TimeStat="Night";
		}
		else
		{
		Msgzone.add("La lumiere du jour revient suivie par son compagnon le soleil.");
		TimeStat="Day";
		}
	
		DayInterval+=Tour;

	}
	RoomList[Xr*100+Yr].moveMonsters();


}

function gameOver()
{
	clean();
	surface.font = "100px pixel";
	surface.fillStyle="rgb(50,50,50)";
	surface.fillText("GAME OVER", document.getElementById('canvas').width/2-400/2,document.getElementById('canvas').height/2-100/2);
	exit();

}


window.onkeydown = function(event) {
	var e = event || window.event;
	var key = e.which || e.keyCode;
	if(Phase=="createPlayer")
	{
		switch(key)
		{
			case 13:
		
					exit();
					createRoom();
					player=new Player(Math.floor(RoomList[Xr*100+Yr].x/32)+1,Math.floor(RoomList[Xr*100+Yr].y/32)+1,50,50,180,50,Class[Select_index]);
					Phase="game";
					Interval=setInterval(function() {
							game();
					}, 20);
	
			break;
			case 40:
				Select_index+=1;
			break;
			case 39:
				Choice_page+=1;
			break;
			case 37:
				Choice_page-=1;
			break;
			case 38:
				Select_index-=1;
			break;
		}
	}
	if(Phase=="title")
	{
		switch(key)
		{
			case 13:
				switch(Select_index)
				{
					case 1:
					exit();
					Select_index=0;
					Interval=setInterval(function() {
							createPlayer();
					}, 20);
					break;
					case 2:
		
					break;
					case 3:
		
					break;
				}
			break;
			case 40:
				Select_index+=1;
			break;

			case 38:
				Select_index-=1;
			break;
		}
	}
	if(Phase=="game")
	{
		action();
		switch(key)
		{
			case 39:
			player.move("right");
			break;
			case 40:
			player.move("down");
			break;
			case 37:
			player.move("left");
			break;
			case 38:
			player.move("up");
			break;
			case 76:
			player.lap();
			break;
			case 73:
			exit();
			Phase="inventory";
			Msgzone.add("Vous vous asseyez sur le sol et vous ouvrez votre sac.");
			Interval=setInterval(function() {
				player.inventory.open();
			}, 20);	
			break;
			case 69:
			exit();
			Phase="equipement";
			Msgzone.add("Vous vous asseyez sur le sol et vous otez votre equipement.");
			Interval=setInterval(function() {
				player.equipement.open();
			}, 20);	
			break;
		}
	}
	if(Phase=="inventory")
	{
		switch(key)
		{
			case 68:
			Msgzone.add("Vous abandonnez l'objet "+player.inventory.contains[player.inventory.index].Name+".");
			player.inventory.remove(player.inventory.index);
			break;
			case 69:
			if(player.inventory.examination==0)
			{
				Msgzone.add("Vous regardez l'objet "+player.inventory.contains[player.inventory.index].Name+" de plus pres.");
				player.inventory.examination+=1;
				return;
			}
			if(player.inventory.examination==1)
			{
				player.inventory.examination-=1;
				return;
			}
			break;
			case 40:
			player.inventory.downList();
			break;
			case 13:
			player.inventory.use();
			break;
			case 38:
			player.inventory.upList();
			break;
			case 27:
			exit();
			Phase="game";
			Msgzone.add("Vous fermez votre sac et vous vous redressez pret a repartir.");
			Interval=setInterval(function() {
				game()
			}, 20);	
			break;
		}
	}
	if(Phase=="equipement")
	{
		switch(key)
		{
			case 40:
			player.equipement.downList();
			break;
			case 38:
			player.equipement.upList();
			break;
			case 27:
			exit();
			Phase="game";
			Msgzone.add("Vous remettez votre equipement en place et vous vous redressez pret a repartir.");
			Interval=setInterval(function() {
				game()
			}, 20);	
			break;
		}
	}

}

function exit()
{
	clearInterval(Interval);
}

