export abstract class ModConstants {
  public static EMPTY = "";
  public static EXTENSION_JSON: string = ".json";
  public static PATH_GLOBAL_UI_LAYOUTS: string = "global\\ui\\layouts\\";
  
  public static CHILDREN_BACKGROUND_FIELDS_FILENAME: string = "PANEL\\Horadric_Cube\\HoradricCube_BG2";
  public static CHILDREN_BACKGROUND_FIELDS_RECT: { x: number, y: number } = config.IsExpandedInventory ? { x: -560, y: 845 } : { x: -342, y: 880 };
  
  public static CHILDREN_CONVERT_FIELDS_RECT_Y:         number = config.IsExpandedInventory ? 1287 : 1320;
  public static CHILDREN_CONVERT_FIELDS_RECT_X_DEFAULT: number = config.IsExpandedInventory ? -337 : -117;
  public static CHILDREN_CONVERT_FIELDS_RECT_X_SCALE:   number = config.IsExpandedInventory ? -395 : -175;
  public static CHILDREN_CONVERT_FIELDS_RECT_X:         number = config.ShouldScaleTransmuteButton ? this.CHILDREN_CONVERT_FIELDS_RECT_X_SCALE : this.CHILDREN_CONVERT_FIELDS_RECT_X_DEFAULT
  public static CHILDREN_CLOSE_FIELDS_RECT_X:           number = config.IsExpandedInventory ? -295 :  -72;
  public static CHILDREN_CLOSE_FIELDS_RECT_Y:           number = config.IsExpandedInventory ?  775 :  810;
  public static CHILDREN_GRID_FIELDS_RECT_X:            number = config.IsExpandedInventory ? -538 : -318;
  public static CHILDREN_GRID_FIELDS_RECT_Y:            number = config.IsExpandedInventory ?  867 :  903;
}
