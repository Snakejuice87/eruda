app.EnableBackKey( false );
var layouts=[];
//Called when application is started.
function OnStart()
{
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );
	lay.SetBackColor( "#cc22cc" );
	app.AddLayout( lay );
	
	scroll = app.CreateScroller( 1.0, 1.0 );
	lay.AddChild( scroll );
    
    layScroll = app.CreateLayout( "Linear", "Left" );
    scroll.AddChild( layScroll );
    
    // get the full path of all the images as list
    var list = app.ListFolder( "/sdcard/WhatsApp/Media/WhatsApp Images", ".jpg", null, "FullPath, Files" );
    
    // Array for all the images objects
    var images = [];
    
    // Array for all the horizontals layouts
    var horizontal_layouts = [];
    
    // save the length of the paths array
    var list_len = list.length;
    
    // create new 2d array for the paths
    var newArr = [];
    while(list.length) newArr.push(list.splice(0,3));
    
    app.ShowProgressBar( "Loading...", 0, "Light");
    
    var num_of_created_images = 0;
    
    // add the images to the screen
    for(var i = 0; i < newArr.length; i++)
    {
        horizontal_layouts[i] = app.CreateLayout("Linear", "Horizontal,Center" );
        horizontal_layouts[i].SetSize(1, -1);
        
        for(var j = 0; j < newArr[i].length; j++)
        {
            images[num_of_created_images] = app.CreateImage(newArr[i][j], 0.3, 0.15, "Resize, ScaleCenter, alias, button");
            images[num_of_created_images].SetMargins(0.015, 0.005, 0.015, 0.005);
            images[num_of_created_images].SetOnTouchUp(show_image);
            images[num_of_created_images].path = newArr[i][j];
            horizontal_layouts[i].AddChild(images[num_of_created_images]);
            
            num_of_created_images++;
            app.UpdateProgressBar( num_of_created_images * 100 / list_len);
        }
        
        layScroll.AddChild(horizontal_layouts[i]);
    }
    app.HideProgressBar();
}

function show_image()
{
    preview_image_lay = app.CreateLayout( "linear", "VCenter,FillXY" );
    preview_image_lay.SetOnTouch(unselect_image);
    
    var img = app.CreateImage(this.path, 0.95, -1);
    preview_image_lay.AddChild(img);
    app.AddLayout(preview_image_lay);
    
    layouts.push(preview_image_lay);
}

function unselect_image()
{
	if(layouts.length == 0)
	{
		app.Exit();
	}
	else
	{
    	app.DestroyLayout(layouts[layouts.length-1]);
    	layouts.pop();
    }
}

function OnBack()
{
	unselect_image();
}