//////////////////////////////////////////////////////////////////////////////////////
//class Input
//////////////////////////////////////////////////////////////////////////////////////
//par chaipokoi
//crée le : 11/08/2012
/////////////////////////////////////////////////////////////////////////////////////
//Redistribue les entrées.
////////////////////////////////////////////////////////////////////////////////////


function Input()
{
}

Input.prototype.equals=function(value)
{
		if(LastKey==value)
		{
			LastKey=0;
			return true;
		}
		else
		{
			return false;
		}
}