// export * from "./docket-alarm-sdk";
export * from "./types";

import { Base } from "./base";
import { DocketAlarm } from "./docket-alarm-sdk";
import { applyMixins } from "./utils";

class DockAlarm extends Base {}
interface DockAlarm extends DocketAlarm {}

applyMixins(DockAlarm, [DocketAlarm]);

export default DockAlarm;
