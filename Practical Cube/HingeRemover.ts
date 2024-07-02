import { ModConstants } from "./ModConstants";

export class HingeRemover {
  protected readonly FILE_PROFILE_HD: string = `${ModConstants.PATH_GLOBAL_UI_LAYOUTS}_profilehd${ModConstants.EXTENSION_JSON}`;
  protected readonly FILE_PROFILE_LV: string = `${ModConstants.PATH_GLOBAL_UI_LAYOUTS}_profilelv${ModConstants.EXTENSION_JSON}`;

  protected readonly EMPTY = "";
  protected readonly EMPTY_OBJECT = {};

  public removeForHD(): void {
    let path = this.FILE_PROFILE_HD;
    let file = this.removeBase(path);

    file.LeftHingeRect = this.EMPTY_OBJECT;
    file.RightHingeRect = this.EMPTY_OBJECT;

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

  public removeForLowVision(): void {
    let path = this.FILE_PROFILE_LV;
    let file = this.removeBase(path);

    D2RMM.writeJson(path, file);
  }

  protected removeBase(path: string): JSONData {
    let file = D2RMM.readJson(path);

    file.LeftSideSprite = this.EMPTY;
    file.LeftSideRect = this.EMPTY_OBJECT;
    file.LeftHingeSprite = this.EMPTY;

    file.RightSideSprite = this.EMPTY;
    file.RightSideRect = this.EMPTY_OBJECT;
    file.RightHingeSprite = this.EMPTY;

    return file;
  }
}
