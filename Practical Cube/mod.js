class FileConstants {
  static EXTENSION_JSON = ".json";
  static PATH_GLOBAL_UI_LAYOUTS = "global\\ui\\layouts\\";
  static FILE_CUBE_LAYOUT = `${this.PATH_GLOBAL_UI_LAYOUTS}horadriccubelayouthd${this.EXTENSION_JSON}`;
  static FILE_PROFILE_HD = `${this.PATH_GLOBAL_UI_LAYOUTS}_profilehd${this.EXTENSION_JSON}`;
  static FILE_PROFILE_LV = `${this.PATH_GLOBAL_UI_LAYOUTS}_profilelv${this.EXTENSION_JSON}`;
}

class ModConstants {
  static EMPTY_OBJECT = {};
  static EMPTY = "";

  static CHILDREN_BACKGROUND_FIELDS_RECT        = config.IsExpandedInventory ? { x: -560, y: 845 } : { x: -342, y: 880 };
  static CHILDREN_BACKGROUND_FIELDS_FILENAME    = "PANEL\\Horadric_Cube\\HoradricCube_BG2";
  static CHILDREN_CONVERT_FIELDS_RECT_Y         = config.IsExpandedInventory ? 1287 : 1320;
  static CHILDREN_CONVERT_FIELDS_RECT_X_DEFAULT = config.IsExpandedInventory ? -337 : -117;
  static CHILDREN_CONVERT_FIELDS_RECT_X_SCALE   = config.IsExpandedInventory ? -395 : -175;
  static CHILDREN_CONVERT_FIELDS_RECT_X         = config.ShouldScaleTransmuteButton ? this.CHILDREN_CONVERT_FIELDS_RECT_X_SCALE : this.CHILDREN_CONVERT_FIELDS_RECT_X_DEFAULT
  static CHILDREN_CLOSE_FIELDS_RECT_X           = config.IsExpandedInventory ? -295 :  -72;
  static CHILDREN_CLOSE_FIELDS_RECT_Y           = config.IsExpandedInventory ?  775 :  810;
  static CHILDREN_GRID_FIELDS_RECT_X            = config.IsExpandedInventory ? -538 : -318;
  static CHILDREN_GRID_FIELDS_RECT_Y            = config.IsExpandedInventory ?  867 :  903;
}

class PracticalCubeMod {
  build() {
    this.copyBackgroundSprites();
    this.modifyCubeWindow();

    if (config.ShouldRemoveSidePanels) {
      this.removeSidePanelsHD();
      this.removeSidePanelsLV();
    }
  }

  copyBackgroundSprites() {
    D2RMM.copyFile('hd', 'hd', true);
  }

  modifyCubeWindow() {
    let path = FileConstants.FILE_CUBE_LAYOUT;
    let file = D2RMM.readJson(path);
    
    // fit new cube ui elements to the inventory
    file.fields.rect   = { x: -1394, y: -651, width: 0, height: 0 };
    file.fields.anchor = { x: 1,     y: 0.397 };
    
    // position and hide ui elements
    file.children.forEach((child) => {
        // remove click catcher so the inventory is usable when the new cube window is open
        if (child.name === 'click_catcher') {
          child.fields.rect = ModConstants.EMPTY;
        }
    
        // replace cube background sprite
        if (child.name === 'background') {
            child.fields.rect = ModConstants.CHILDREN_BACKGROUND_FIELDS_RECT;
            child.fields.filename = ModConstants.CHILDREN_BACKGROUND_FIELDS_FILENAME;
        }
    
        // remove left hinge
        if (child.name === 'LeftHinge') {
            child.fields.rect     = ModConstants.EMPTY;
            child.fields.filename = ModConstants.EMPTY;
        }
    
        // remove cube window title
        if (child.name === 'title') {
            child.fields.rect  = ModConstants.EMPTY;
            child.fields.style = ModConstants.EMPTY;
            child.fields.text  = ModConstants.EMPTY;
        }
    
        // reposition transmute button
        if (child.name === 'convert') {
          child.fields.rect.x = ModConstants.CHILDREN_CONVERT_FIELDS_RECT_X;
          child.fields.rect.y = ModConstants.CHILDREN_CONVERT_FIELDS_RECT_Y
          if (config.ShouldScaleTransmuteButton) {
            child.fields.rect.scale = 1.5;
          }
        }
    
        // reposition close button (don't technically need it due to escape button but we'll keep it).
        if (child.name === 'close') {
            child.fields.rect.x = ModConstants.CHILDREN_CLOSE_FIELDS_RECT_X;
            child.fields.rect.y = ModConstants.CHILDREN_CLOSE_FIELDS_RECT_Y;
          }
    
        // reposition (invisible) grid to match up with new HoradricCube_BG2 sprite
        if (child.name === 'grid') {
            child.fields.rect.x = ModConstants.CHILDREN_GRID_FIELDS_RECT_X;
            child.fields.rect.y = ModConstants.CHILDREN_GRID_FIELDS_RECT_Y;
        }
      });
    
    D2RMM.writeJson(path, file);
  }

  removeSidePanelsHD() {
    let path = FileConstants.FILE_PROFILE_HD;
    let file = this.removeSidePanelsBase(path);
    
    file.LeftHingeRect  = ModConstants.EMPTY_OBJECT;
    file.RightHingeRect = ModConstants.EMPTY_OBJECT;
    
    file.StyleSettingsNumericSlider = {
      ...file.StyleSettingsNumeric,
      alignment: {
        ...file.StyleSettingsNumeric.alignment,
        h: 'right',
      },
    };
    file.SettingsSliderValueFields.style = '$StyleSettingsNumericSlider';
    
    D2RMM.writeJson(path, file);
  }

  removeSidePanelsLV() {
    let path = FileConstants.FILE_PROFILE_LV;
    let file = this.removeSidePanelsBase(path);
    
    D2RMM.writeJson(path, file);
  }

  removeSidePanelsBase(path) {
    let file = D2RMM.readJson(path);

    file.LeftSideSprite   = ModConstants.EMPTY;
    file.LeftSideRect     = ModConstants.EMPTY_OBJECT;
    file.LeftHingeSprite  = ModConstants.EMPTY;
    
    file.RightSideSprite  = ModConstants.EMPTY;
    file.RightSideRect    = ModConstants.EMPTY_OBJECT;
    file.RightHingeSprite = ModConstants.EMPTY;

    return file;
  }
}

(new PracticalCubeMod()).build();
