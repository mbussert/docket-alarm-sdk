type Auth = {
  username: string;
  password: string;
};

export class DocketAlarm {
  private username: string;
  private password: string;
  private base_api: string = "https://www.docketalarm.com/api/v1/";
  private loginToken: string | null = null;

  constructor({ username, password }: Auth) {
    if (!username || !password) {
      throw new Error("Missing authentication credentials.");
    }

    this.username = username;
    this.password = password;
    this.loginUser();
  }

  private async loginUser() {
    try {
      const encodeUser = encodeURI(this.username);
      const loginUrl = `${this.base_api}login?username=${encodeUser}&password=${this.password}`;

      const response = await fetch(loginUrl, {
        method: "POST",
      });

      if (response.ok) {
        const responseData = await response.json();
        this.loginToken = responseData.login_token;
      } else {
        throw new Error("User login failed.");
      }
    } catch (error: any) {
      console.error("Login failed: ", error.message);
    }
  }

  // Search Docket Alarm
  // The search/ endpoint searches every docket and document on Docket Alarm.
  // Preferred Search Option

  public async docketAlarmSearch() {
    // Requires: login_token, q, o, limit, offset
    // Optional: client_matter, scroll / scroll_parallel / scroll_index
  }

  // Search Direct Methods - Searching Courts Directly
  // Search state and agency dockets directly with the searchdirect/ endpoint.
  // GET Request: Return a list of courts that support the searchdirect/ endpoint.
  // GET Request with a court Parameter: Get the required and optional search arguments for searching with the searchdirect/ endpoint.
  // POST Request: Run the search.

  public async getDirectSearchCourts() {
    // Blank GET request to Direct Search Endpoint
    // Requires login_token & client_matter
    return {
      courts: [
        "Supreme Court of the United States",
        "California State Supreme Court",
        "Connecticut State, Supreme Court",
        "Florida State, Supreme Court",
        "Minnesota State, Supreme Court",
        "Nevada State, Supreme Court",
        "Oregon State, Supreme Court",
        "Pennsylvania State, Supreme Court",
        "South Carolina State, Supreme Court",
      ],
      success: true,
    };
  }

  public async getDirectSearchParams() {
    // GET request to Docket Alarm Direct Endpoint
    // Example: searchdirect/?login_token=<LOGIN_TOKEN>&client_matter=<CLIENT MATTER>&court=Pennsylvania%20State,%20Commonwealth%20Court
    // If the court parameter is added, then a structure is returned documenting the required and optional search parameters, and also, allowed values for those parameters.
    return {
      success: true,
      required: ["court"],
      optional: [
        "docketnum",
        "party_name",
        "county",
        "court_office",
        "date_filed_start",
        "date_filed_end",
        "max_pages",
      ],
      choices: {
        max_pages: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25,
        ],
        county: [
          null,
          "Adams",
          "Allegheny",
          "Armstrong",
          "Beaver",
          "Bedford",
          "Berks",
          "Blair",
          "Bradford",
          "Bucks",
          "Butler",
          "Cambria",
          "Cameron",
          "Carbon",
          "Centre",
          "Chester",
          "Clarion",
          "Clearfield",
          "Clinton",
          "Columbia",
          "Crawford",
          "Cumberland",
          "Dauphin",
          "Delaware",
          "Elk",
          "Erie",
          "Fayette",
          "Forest",
          "Franklin",
          "Fulton",
          "Greene",
          "Huntingdon",
          "Indiana",
          "Jefferson",
          "Juniata",
          "Lackawanna",
          "Lancaster",
          "Lawrence",
          "Lebanon",
          "Lehigh",
          "Luzerne",
          "Lycoming",
          "McKean",
          "Mercer",
          "Mifflin",
          "Monroe",
          "Montgomery",
          "Montour",
          "Northampton",
          "Northumberland",
          "Perry",
          "Philadelphia",
          "Pike",
          "Potter",
          "Schuylkill",
          "Snyder",
          "Somerset",
          "Sullivan",
          "Susquehanna",
          "Tioga",
          "Union",
          "Venango",
          "Warren",
          "Washington",
          "Wayne",
          "Westmoreland",
          "Wyoming",
          "York",
        ],
      },
    };
  }

  public async directCourtSearch() {
    // POST request with all required search params
    // For non-PACER courts
    // The result is returns a dictionary with an entry search_results, a list of dictionaries.
    const isPending = false;
    const isError = false;

    type DirectCourtSearchResponse = {
      title: string; // Title of the case
      court: string; // Name of court handling case
      docket: string; // Docket title of the case
      date_filed: Date; // Date case was filed
      link: string; // URL to full docket on Docket Alarm
    };

    const fakeDirectCourtSearchResponse: DirectCourtSearchResponse = {
      title: "Smith v. Washington",
      court: "California State Supreme Court",
      docket: "Smith, et al. v. Washington, et al.",
      date_filed: new Date(),
      link: "http://www.fakecourt.com/docket/case1234",
    };

    return [fakeDirectCourtSearchResponse, isPending, isError];
  }

  // Search PACER
  // Search for PACER dockets using the searchpacer/ endpoint.

  public async getPacerSearchInfo() {
    // Blank GET request
    // login_token & client_matter required
    type PacerSearchInfoResponse = {
      courts: string[]; //	A list of PACER courts serviced by this endpoint.
      court_regions: string[]; //	A list of valid court regions that you can use in a GET request below.
      nature_of_suits: string[]; //	A list of nature of suit (NOS) codes that you can use in a GET request below.
      case_types: string[]; //	A list of case type codes that you can use in a GET request below.
    };

    return {};
  }

  public async pacerSearch() {
    // Requires login_token & client_matter (max length 50 char)
    // Example: GET https://www.docketalarm.com/api/v1/searchpacer/?login_token=<LOGIN_TOKEN>>&party_name=<PARTY_NAME>&client_matter=<CLIENT_MATTER>&page=2
    // Optional params:
    // party_name, first_name, middle_name, last_name, nature_of_suit, date_filed_start, date_filed_end, date_terminated_start, date_terminated_end, page, court_region, docket_num, case_type, mdl_id, ssn_tid, ssn4

    type PacerSearchResponse = {
      search_results: PacerSearchResult[]; // A list of dictionaries where each dictionary is specified in the following section.
      page_max: number; // 	Only 50 search results are returned per search. If there are more items, then this variable will be set to the number of pages containing data. *** ONLY USE PAGE_MAX FOR PAGES 2 AND ABOVE ***
      success: boolean;
    };

    type PacerSearchResult = {
      title: string; //	The title of the case
      court: string; //	The name of the court handling the case.
      docket: string; // The docket title of the case.
      date_filed: string; // The date the case was filed.
      link: string; // A URL to the full docket on Docket Alarm.
      nature_of_suit: string; // (Optional) The nature of the suit code, if one exists (Bankruptcy cases do not have natures of suit).
      date_terminated: string; // (Optional) If the case was terminated, this value returns the date.
      party_name: string; // (Optional) If party_name was provided in the searchpacer/ call, then this field will provide the full party's name. For example, if searchpacer/ was called with party_name=ebay, then this field may be "eBay, Inc.".
      party_role: string; // (Optional) If party_name was provided in the searchpacer/ call, then this field will provide the party's role in the lawsuit (e.g., Plaintiff, Defendant, etc.). See Appendix C for a list of valid values.
    };

    const fakePacerResult: PacerSearchResponse = {
      page_max: 4,
      search_results: [
        {
          title: "Broadcast Music Inc et al v. Camp Lounge L L C et al",
          court: "Louisiana Western District Court",
          docket: "6:13-cv-01271",
          party_role: "Plaintiff",
          party_name: "Sony A T V Tree Publishing",
          date_filed: "5/29/2013",
          date_terminated: "",
          link: "https://www.docketalarm.com/cases/Louisiana_Western_District_Court/6--13-cv-01271/Broadcast_Music_Inc_et_al_v._Camp_Lounge_L_L_C_et_al/",
          nature_of_suit: "820",
        },
        {
          title: "Adaptix, Inc. v. Sony Mobile Communications, Inc. et al",
          court: "Texas Eastern District Court",
          docket: "6:13-cv-00442",
          party_name: "Sony Mobile Communications (USA), Inc.",
          party_role: "Defendant",
          date_filed: "5/28/2013",
          date_terminated: "",
          link: "https://www.docketalarm.com/cases/Texas_Eastern_District_Court/6--13-cv-00442/Adaptix_Inc._v._Sony_Mobile_Communications_Inc._et_al/",
          nature_of_suit: "830",
        },
      ],
      success: true,
    };

    return fakePacerResult;
  }
}
