import { ModConstants } from "./ModConstants";

export class CubeWindowBuilder {
  protected readonly FILE_CUBE_LAYOUT: string = `${ModConstants.PATH_GLOBAL_UI_LAYOUTS}horadriccubelayouthd${ModConstants.EXTENSION_JSON}`;

  public build(): void {
    this.copyBackgroundSprites();
    this.modifyCubeWindow();
  }

  protected copyBackgroundSprites(): void {
    D2RMM.copyFile('hd', 'hd', true);
  }

  protected modifyCubeWindow(): void {
    let path = this.FILE_CUBE_LAYOUT;
    let file = D2RMM.readJson(path);

    // fit new cube ui elements to the inventory
    file.fields.rect = { x: -1394, y: -651, width: 0, height: 0 };
    file.fields.anchor = { x: 1, y: 0.397 };

    // position and hide ui elements
    
    // Object.entries(file).find(x => x.key === "children").forEach
    file.children.forEach((child) => {
      if (child.name === 'click_catcher') this.removeClickCatcher(child); // so the inventory is usable when the new cube window is open
      if (child.name === 'background') this.replaceBackgroundSprite(child);
      if (child.name === 'LeftHinge') this.removeLeftHinge(child);
      if (child.name === 'title') this.removeCubeWindowTitle(child);
      if (child.name === 'convert') this.repositionTransmuteButton(child);
      if (child.name === 'close') this.repositionCloseButton(child); // don't technically need it due to escape button but we'll keep it
      if (child.name === 'grid') this.repositionGrid(child); // to match up with new HoradricCube_BG2 sprite
    });

    D2RMM.writeJson(path, file);
  }

  private removeClickCatcher(child: JSONData): void {
    child.fields.rect = ModConstants.EMPTY;
  }

  private replaceBackgroundSprite(child: JSONData): void {
    child.fields.rect = ModConstants.CHILDREN_BACKGROUND_FIELDS_RECT;
    child.fields.filename = ModConstants.CHILDREN_BACKGROUND_FIELDS_FILENAME;
  }

  private removeLeftHinge(child: JSONData): void {
    child.fields.rect = ModConstants.EMPTY;
    child.fields.filename = ModConstants.EMPTY;
  }

  private removeCubeWindowTitle(child: JSONData): void {
    child.fields.rect = ModConstants.EMPTY;
    child.fields.style = ModConstants.EMPTY;
    child.fields.text = ModConstants.EMPTY;
  }

  private repositionTransmuteButton(child: JSONData): void {
    child.fields.rect.x = ModConstants.CHILDREN_CONVERT_FIELDS_RECT_X;
    child.fields.rect.y = ModConstants.CHILDREN_CONVERT_FIELDS_RECT_Y

    if (config.ShouldScaleTransmuteButton) {
      child.fields.rect.scale = 1.5;
    }
  }

  private repositionCloseButton(child: JSONData): void {
    child.fields.rect.x = ModConstants.CHILDREN_CLOSE_FIELDS_RECT_X;
    child.fields.rect.y = ModConstants.CHILDREN_CLOSE_FIELDS_RECT_Y;
  }

  private repositionGrid(child: JSONData): void {
    child.fields.rect.x = ModConstants.CHILDREN_GRID_FIELDS_RECT_X;
    child.fields.rect.y = ModConstants.CHILDREN_GRID_FIELDS_RECT_Y;
  }
}
