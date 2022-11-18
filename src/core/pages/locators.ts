export const general = {
  get userIcon() { return $('[class="header__personal-info pointer ng-star-inserted"]') },
  get logOut() { return $('//*[@class="cdk-overlay-pane"]/div/div[4]') },
  get dropDown() { return $('[class *= "standard-select-dropdown"]') },
  linkByName(name: string) {
    return $(`//a[contains(text(),"${name}")]`);
  },
  divByName(name: string) {
    return $(`//div[contains(text(),"${name}")]`);
  },
  divByNameNum(name: string, num: number) {
    return $(`(//div[contains(text(),"${name}")])[${num}]`);
  },
  spanByName(name: string) {
    return $(`//span[contains(text(),"${name}")]`);
  },
  spanByNameNum(name: string, num: number) {
    return $(`(//span[contains(text(),"${name}")])[${num}]`);
  },
  spanByNameArray(name: string) {
    return $$(`//span[contains(text(),"${name}")]`);
  },
  selectOption(option: string) {
    return $(`//span[@class="mat-option-text" and contains(.,"${option}")]`);
  },
  rowByName(name: string) {
    return $(`//tr[contains(.,"${name}")]`);
  },
  buttonByName(name: string) {
    return $(`//button[contains(.,"${name}")]`);
  },
  inputValue(name: string) {
    return $(`input[placeholder="${name}"]`);
  },
  // notificationByText(text: string) {
  //   return $(`//centtrip-snackbar/section/div[contains(text(),"${text}")]`);
  // },
  // arrayOfOptions: $$('[class="mat-option-text"]'),
  // liByName(name: string) {
  //   return $(`//li[contains(text(),"${name}")]`);
  // },
  elementByText(text: string) {
    return $(`//*[contains(text(),"${text}")]`);
  },
  get lastEditBtn() {
    return $(`(//button[@class="btn btn-default"])[last()]`);
  }
};

export const signInPageElements = {
  get emailField() { return $('#Email') },
  get passwordField() { return $('#Password') },
  get signInWindow() { return $('.login') },
  get registerButton() { return $('.ml-4') },
  // forgotPasswordButton: $('[class="mr-4 forgot-password"]'),
  // : $('[class=""]'),
  // signInButton: $('[class="btn btn-primary btn-block login-submit"]'),
  get signInButton() { return $('[class="btn btn-primary btn-block login-submit"]') },
  get termsCheckbox() { return $('#TermsAndConditions') },
  // recaptchaCheckbox: $('[id="recaptcha-anchor"]'),
  // termsLink: $('//a[contains(text(),"Terms and Conditions")]'),
  // invalidSignInError: $('//div[contains(text(),"Invalid sign in attempt")]'),
  // termsCheckboxChecked: $('[id="TermsAndConditions"][checked="checked"]'),
  // emailError: $('[id="Email-error"]'),
  // emptyEmailField: $(
  //   '//span[@data-valmsg-for="Email" and contains(.,"This field is required")]'
  // ),
  // emptyPassField: $(
  //   '//span[@data-valmsg-for="Password" and contains(.,"This field is required")]'
  // ),
  // termsUnSelected: $(
  //   '//span[@data-valmsg-for="TermsAndConditions" and contains(.,"Terms and conditions checkbox should be checked to proceed")]'
  // ),
  // privacyTerms: $('//footer//a'),
  // privacyTermsApp: $('//footer//div[3]//a'),
  // privacyTermsUSA: $('//centtrip-footer//div[3]/div[1]/a'),
  // privacyTermsMobile: $('//footer/div/div[2]/p/a'),
  // appPortalLeftCopyright: $('//div[2]//footer/div/div[1]'),
  // createAppLeftCopyright: $('//div[1]/div[2]/footer/div/div[1]'),
  // mobileTopCopyright: $('//div[3]//footer/div/div[1]'),
  // USALeftCopyright: $('//footer/div/div[1]'),
  // USALeftCopyrightFTL: $('[class="footer-left-text-portal footer-side-text"]'),
  // USADashboardLeftCopyright: $('//centtrip-footer/div/div[1]'),
  // UKDashboardLeftCopyright: $('[class="footer-left-text-portal footer-side-text"]'),
  // appPortalLeftCopyrightNonApps: $('[class="footer-left-text-portal footer-side-text-portal"]'),

};

export const createAccountPageElements = {
  get createAccountWindow() { return $('[class="registration-section"]') },
  get backButton() { return $('[class="registration-button-transparent registration-back"]') },
  //   createHeader: $('[class ="mb-4 text-center"]'),,
  get firstNameField() { return $('[id = "registration-first-name"]') },
  get lastNameField() { return $('[id = "registration-last-name"]') },
  get dobField() { return $('[id="dob-date"]') },
  get mobField() { return $('[id = "MonthOfBirth"]') },
  get yobField() { return $('[id="dob-year"]') },
  get emailField() { return $('[id = "registration-email"]') },
  get passField() { return $('[id = "registration-password"]') },
  get confirmPassField() { return $('[id = "registration-confirm"]') },
  get selectMonth() { return $('//*[@id="MonthOfBirth"]/option[2]') },
  //   selectMonthFeb: $('//*[@id="MonthOfBirth"]/option[3]'),
  //   selectMonthApr: $('//*[@id="MonthOfBirth"]/option[5]'),
  get submitButton() { return $('[id="registration-submit"]') },
  //   firstNameEmptyField: $(
  //     '//span[@id="first-name-validation-field" and contains(.,"This field is required")]'
  //   ),
  //   lastNameEmptyField: $(
  //     '//span[@id="last-name-validation-field" and contains(.,"This field is required")]'
  //   ),
  //   emptyEmailField: $(
  //     '//span[@id="email-validation-field" and contains(.,"This field is required")]'
  //   ),
  //   emailAlreadyExist: $('//span[contains(.,"User with this email already exists")]'),
  //   emptyPassField: $(
  //     '//span[@id="password-validation-field" and contains(.,"This field is required")]'
  //   ),
  //   emptyConfirmPassField: $(
  //     '//span[@id="confirm-validation-field" and contains(.,"This field is required")]'
  //   ),
  //   emailNotValidError: $('[id="registration-email-error"]'),
  //   passwordnNotValidError: $('[id="registration-password-error"]'),
  //   passwordnNotValidError2: $(
  //     '//div[5]/span[(text() = "Passwords must have at least one non alphanumeric character.")]'
  //   ),
  //   confirmPasswordError: $('[id="registration-confirm-error"]'),
  //   dobFieldError: $('[id="DayOfBirth-error"]'),
  //   mobFieldError: $('[id="MonthOfBirth-error"]'),
  //   yobFieldError: $('[id="YearOfBirth-error"]'),
  //   maxLengthFirstName: $('[id="registration-first-name"][maxlength="50"]'),
  //   maxLengthLastName: $('[id="registration-last-name"][maxlength="50"]'),
  //   invalidDobError: $('[id="registration-client-side-validation-message"]'),

  //   selectedMonth(month:string):ElementFinder {
  //     return $(`//*[(text() = "${month}")]`);
  //   }
};

export const confirmAccountPageElements = {
  get confirmAccountWindow() { return $('[class="registration-section"]') },
  get emailConfirm() { return $('[class="gold-text"]') },
  //   goToSignButton: $('[class="btn btn-primary btn-block registration-submit"]'),
  //   resendLinkButton: $('[value="AccountConfirmation.Submit"]')
};

export const mainMailPageElements = {
  get checkButton() { return $('[id="getinbox"]') },
  get emailField() { return $('[id="inbox-name"]') },
  // openLastEmail: $('//*[@id="mail_list_body"]/tr/td[2]/a'),
  // openSecondEmail: $('//*[@id="mail_list_body"]/tr[2]/td[2]'),
  // arrayOfOpenURLs: $$('//*[@id="mail_list_body"]/tr/td[2]'),
  get verifyButton() { return $('//a[contains(text(),"Start Now")]') },
  // arrayOfEmails: $$('//*[@id="mail_list_body"]/tr'),
  get verificationCode() { return $('[class="verification-code"]') },
  get numberOfEmails() { return $('[id="mailcount"]') },
  // passChangedMessage: $('//td[contains(.,"Password Successfully Changed")]'),
  // activeAccountMessage: $('//td[contains(.,"Activate your account")]'),
  // accountDisabled: $('//span[contains(.,"Account temporarily disabled")]'),
  // emptyMailBox: $('//*[@id="mailcount"][contains(.,"0")]'),
  // emailTemplateHeader: $('//table[2]//tbody/tr[2]//tr'),
  // firstTimeLoginButton: $('//tbody/tr[8]//a'),
  // activationUKAccountButton: $('//tbody/tr[7]/td/a'),
  // lastOneSmsCode: $('(//div[contains(text(),"Centtrip")]/span)[1]'),
  emailsOnCurrentDate(date: string) {
    return $$(`//*[@class="time_column"][contains(text(),"${date}")]`);
  }
};

export const congratulationsWindowElements = {
  get goToSignButton() { return $('[class="btn btn-primary btn-block registration-submit"]') },
  get congratWindow() { return $('//p[contains(text(),"account is successfully activated!")]') }
};

export const createNewAppElements = {
  firstStep: {
    get newAppIframe() { return $('#collection') },
    get newAppHeaderUSA() { return $('//h2[contains(.,"US Company Information")]') },
    get countryOfIncorp() { return $('(//div[1]/div[1]/span/input)[1]') },
    get stateOfIncorp() { return $('(//div[1]/div[1]/span/input)[2]') },
    get firstCountry() { return $('[class="css-we8yn7-Item e1qk3awp3"]') },
    get companyName() { return $('//div[2]/div/div[1]/div[1]/span/input') },
    get tradingName() { return $('//div[4]/label/div/span[2]') },
    get enterManually() { return $('button=enter company manually') },
    get enterManuallyAddress() { return $('button=Enter address manually') },
    get manualCompanyName() { return $('//div[2]/div/label/div/span[2]') },
    get manualCompanyNumber() { return $('//div[2]/label/div/span[2]/input') },
    get companyType() { return $('//div[2]//div[3]/label/div/div') },
    get addressCountryUSA() { return $('//div[5]/div//div/div/div/div[1]/div[1]/span') },
    get addressSearchUSA() { return $('//div[5]//div[2]/div/div[1]/div[1]/span/input') },
    get buildingNumber() { return $('//div[5]//div[2]/div/label[1]//span[2]/input') },
    get addressState() { return $('//label[6]/div/div/div[1]/span') },
    get addressCity() { return $('//div[5]//label[4]/div/span[2]') },
    get addressStreet() { return $('//div[5]/div/div/div/div/label[2]/div/span[2]') },
    get addressPostCode() { return $('//div[5]//label[7]/div/span[2]') },
    get taxNumber() { return $('//div[7]/div/div/span[2]') },
    dateOfIncorporation: {
      get day() { return $('//div[@data-test-id="question_6"]/div/div/div/span[1]/input[1]') },
      get month() { return $('//div[@data-test-id="question_6"]/div/div/div/span[2]/input[1]') },
      get year() { return $('//div[@data-test-id="question_6"]/div/div/div/span[3]/input[1]') },
    },
    get csaFirstName() { return $('//div[@data-test-id="question_0"]/label/div/span[2]/input') },
    get csaLastName() { return $('//div[@data-test-id="question_1"]/label/div/span[2]/input') },
    dateOfBirth: {
      get day() { return $('//div[@data-test-id="question_2"]/div/div/div/span[1]/input') },
      get month() { return $('//div[@data-test-id="question_2"]/div/div/div/span[2]/input') },
      get year() { return $('//div[@data-test-id="question_2"]/div/div/div/span[3]/input') }
    },
    get csaPhoneNumber() { return $('//div[@data-test-id="question_3"]/label/div/span[2]/input') },
    get csaPhoneCountryCode() { return $('//div[@data-test-id="question_4"]/label/div/div/div/div') },
    get csaEmail() { return $('//div[@data-test-id="question_5"]/label/div/span[2]/input') },
    get loaderPath() { return $('//div[@data-test-id="question_6"]/div/div/div/div/div/input') },
    get continueButton() { return $('[type="PRIMARY"]') },
  },
  secondStep: {
    get secondStepHeaderUSA() { return $('//h2[contains(.,"US Bank Details")]') },
    get accountName() { return $('//div[2]/label/div/span[2]') },
    get accountNumber() { return $('//div[3]/label/div/span[2]') },
    get accountType() { return $('//div[4]/label/div/div/div/div') },
    get bankName() { return $('//div[5]/label/div/span[2]') },
    get routingNumber() { return $('//div[6]/label/div/span[2]') },
    get loaderPath() { return $('//div[@data-test-id="question_5"]/div/div/div/div/div/input') },
    get purposeOfPayment() { return $('//div[@data-test-id="question_6"]/label/div/div/div/div') },
    get purposeOfPaymentDesc() { return $('//div[@data-test-id="question_7"]/label/div/span/input') },
  },
  thirdStep: {
    get selectNationality() { return $('//div[contains(text(),"New")]') },
    get thirdStepHeaderUSA() { return $('//h2[contains(.,"US Ownership Structure")]') },
    get addAssociate() { return $('//div[2]//div/div/button') },
    get associateDetails() { return $('//h2[contains(.,"Associate")]') },
    get firstName() { return $('//div[2]//label[1]/div/span[2]/input') },
    get surName() { return $('//div[2]//label[2]/div/span[2]/input') },
    get benefOwner() { return $('//label[3]/div/div/div[1]') },
    get authPerson() { return $('//label[3]/div/div/div[2]') },
    get director() { return $('//label[3]/div/div/div[3]') },
    get addressCountry() { return $('//div[1]/div/div/div/div/div[1]/div[1]/span/input') },
    get dob() { return $('//label[1]/div/div[1]/span[1]/input') },
    get mob() { return $('//label[1]/div/div[1]/span[2]/input') },
    get yob() { return $('//label[1]/div/div[1]/span[3]/input') },
    get addressSearchUSA() { return $('//div[1]/div/div/div[2]/div/div[1]/div[1]/span/input') },
    get addressStreet() { return $('//div[2]/label[2]/div/span[2]/input') },
    get addressPostCode() { return $('//label[7]/div/span[2]') },
    get nationality() { return $('//div[2]/div/div/div[1]/span/input') },
    get percentageShareholding() { return $('(//div/div[1]/label[2]/div/span[2]/input)[3]') }
  },
  addInfoUSA: {
    get addStepHeader() { return $('h2=US Company Associates Additional Information (Country USA)') },
    get addressCityPerson() { return $('//div[2]//label[4]/div/span[2]') },
    get buildingNumberPerson() { return $('//div[2]/div/label[1]/div/span[2]') },
    get jobTitle() { return $('//div[2]/label/div/span[2]') },
    get socSecNumber() { return $('//div[3]/label/div/span[2]') },
    get email() { return $('//div[4]/label/div/span[2]') },
    get phoneNumber() { return $('//div[5]/label/div/span[2]') },
    get phoneType() { return $('//div[6]/label/div/div/div/div') },
    get phoneCode() { return $('//div[7]/label/div/div/div/div') },
    addStepHeaderCustom(text:string) {
      return $(`//h2[contains(.,"${text}")]`);
    }
  },
  additonalStep: {
    get addStepHeader() { return $('//h2[contains(.,"Additional Information")]') },
    get finishButton() { return $('//button[contains(.,"Finish")]') },
    get addDetailsButton() { return $('//button[contains(.,"Add details")]') },
    get submitButton() { return $('[value="Submit"]') },
    get termsCheckbox() { return $('[id="termsAndConditions"]') },
    get termsCheckboxMonex() { return $('[id="termsAndConditionsMonex"]') },
    selectAddDetailsButton(number:number) {
      return $(`(//button[contains(.,"Add details")])[${number}]`);
    }
  },
  butttonByName(name: string) {
    return $(`//button[contains(.,"${name}")]`);
  },
  selectFromDropdown(option:string) {
    return $(`//p[contains(.,'${option}')]`);
  },
};

export const verificationWindowElements = {
  get verifyByEmailButton() { return $('[value="MultiFactorAuthenticationSelection.OneTimeEmail"]') },
  //   verifyByMobileButton: $('[value="MultiFactorAuthenticationSelection.LinkMobileApp"]'),
  //   verifyBySmsButton: $('[value="MultiFactorAuthenticationSelection.OneTimeSms"]'),
  get verifyCodeField() { return $('[class="form-control form-control-lg"]') },
  get submitButton() { return $('[value="MultiFactorAuthenticationEmail.Submit"]') },
};

export const USAMainPageElements = {
  navigationMenu(item: string) {
    return $(`//span[@class="navigation__item-name" and contains(.,"${item}")]`);
  },
  get logoutPage() { return $('//div[@class="text-success mb-4" and contains(.,"You are now signed out")]') },
  switcherUSAUK: {
    get switchCountryButton() { return $('[panelclass="header-select-dropdown header-select-dropdown--country"]') },
    get selectUSA() { return $('[svgicon="flag-usa"]') },
    get selectUK() { return $('[svgicon="flag-uk"]') },
  },
  columnHeader(column: string) {
    return $(`//th[@role="columnheader" and contains(.,"${column}")]`);
  },
  get loaderRightSkeleton() { return $('[class="loader progress ng-star-inserted"]') },
  get dashboardPage() { return $('//span[(text() = "Dashboard")]') },
  get selectCorporateDropdown() { return $('[panelclass="header-select-dropdown"]') },
  get searchField() { return $('[placeholder="Search"]') },
  get searchFieldClear() { return $('(//centtrip-input/div/input)[2]') },
};

export const UKGeneralElements = {
  get UKcontent() { return $('#MainOuterContainer') },
  get alreadyLoginError() { return $('//label[ contains(.,"This user is already logged in to the system.")]') },
  get expenseLogoutBtn() { return $('.button-logout') },
  get settingsButton() { return $('.settings-header-link') },
  get userMenu() { return $('.user-links-container') },
  get loadingScreen() { return $('#loadingScreen') },
  get searchField() { return $('#Keywords') },
  get searchButton() { return $('#search-btn') },
  get optionDropdown() { return $('#selectDropDownList_title') },
};

export const UKCreateUserPageElements = {
  get createAdminArea() { return $('[action="/Corporate/CreateCardForCorporate"]') },
  get emailSAField() { return $('#Email') },
  get emailField() { return $('#corpEmail') },
  get accountDropdown() { return $('#ChosenCorporate_title') },
  get titleDropdown() { return $('#TitleID') },
  get genderDropdown() { return $('#SelectedGender') },
  get firstNameField() { return $('#FirstName') },
  get lastNameField() { return $('#Surname') },
  get lastNameFieldCardholder() { return $('#LastName') },
  get dobField() { return $('#dateofbirth') },
  get dobFieldExist() { return $('#DateOfBirthNormal') },
  get postCodeField() { return $('#PostCode') },
  get address1Field() { return $('#Address1') },
  get address1FieldCardholder() { return $('#AddressLine1') },
  get address2Field() { return $('#Address2') },
  get address2FieldCardholder() { return $('#AddressLine2') },
  get cityField() { return $('#City') },
  get countryDropdown() { return $('#SelectedCountry_title') },
  get countryDropdownCardholder() { return $('#Country_title') },
  get mobileCodeDropdown() { return $('#MobilePhoneCodeID') },
  get homeCodeDropdown() { return $('#HomePhoneCodeID') },
  get mobileNumberField() { return $('#MobileNumber') },
  get homeNumberField() { return $('#HomeNumber') },
  get isSuperAdminButton() { return $('//label[@id="IsCorporateSuperAdmin|perLabelId"]') },
  get isAdminButton() { return $('//label[@id="IsAdmin|perLabelId"]') },
  get defaultPrivileges() { return $('//label[@id="DefaultPrivileges|perLabelId"]') },
  get submitButton() { return $('[type="submit"]') },
  get addButton() { return $('[class="btn btn-default goldbutton"]') },
  get sameCurrencyPaymentsField() { return $('#PaymentToBankLimit') },
  get paymentLimitWithFXField() { return $('#PaymentLimitWithFx') },
  get fxcConversionsInternalField() { return $('#TradeLimit') },
  get walletCardTransferLimitField() { return $('#WalletCardTransferLimit') },
  get createButton() { return $('[value="Create"]') },
  get updateButton() { return $('[value="Update user"]') },
  get modifyButton() { return $('[value="Modify"]') },
  get successCreateMesssage() { return $('.user-message-container-successful') },
  get successOkButton() { return $('#user-message-ok-button') },

  superAdmin: {
    get firstNameField() { return $('#EnterDetailsModel_FirstName') },
    get lastNameField() { return $('#EnterDetailsModel_Surname') },
    get dobField() { return $('#EnterDetailsModel_DateOfBirth') },
    doBSelector: {
      get yearOption() { return $('.xdsoft_label.xdsoft_year') },
      selectDay(day: string) {
        return $(`[data-date="${day}"]`);
      }
    },
    get postCodeField() { return $('#EnterDetailsModel_AddressModel_PostCode') },
    get address1Field() { return $('#EnterDetailsModel_AddressModel_Address1') },
    get address2Field() { return $('#EnterDetailsModel_AddressModel_Address2') },
    get cityField() { return $('#EnterDetailsModel_AddressModel_City') },
    get mobileCodeDropdown() { return $('#EnterDetailsModel_MobilePhoneCodeID_title') },
    get homeCodeDropdown() { return $('#EnterDetailsModel_HomePhoneCodeID_title') },
    get countryDropdown() { return $('#EnterDetailsModel_AddressModel_SelectedCountry_title') },
    get mobileNumberField() { return $('#EnterDetailsModel_MobileNumber') },
    get homeNumberField() { return $('#EnterDetailsModel_HomeNumber') },
    get isSuperAdminButton() { return $('[id="IsCorporateSuperAdmin|perLabelId"]') },
    get isAdminButton() { return $('[id="IsAdmin|perLabelId"]') },
    get saveButton() { return $('[value="Save"]') },

    get lastPageOfChs() { return $('.jPag-last') },
    get chDOBfield() { return $('#DateOfBirth') },
    get chPhoneTitleField() { return $('#PhoneNumberCode_title') },
    chPhoneTitleItem(phoneCode: string){ return $(`//li[.='${phoneCode}']`);},
    get chPhoneNumberField() { return $('#PhoneNumberWithoutCode') },
    get updateChSubmit() { return $('#modify-cardholder-submit') },
    get confirmationModal() { return $('#modify-cardholder-confirm-modal') },
    get confirmationModalOK() { return $(`//div[@id='modify-cardholder-confirm-modal']//input[@id='yes']`) },
    get successUpdateMesssage() { return $(`//span[.='Cardholder details have been updated']`) },
    get successUpdateMesssageOk() { return $(`//div[@id='modify-cardholder-action-modal']//input[@id='yes']`) },
  }
};

export const UKUpdateAccountPageElements = {

};

export const UKSignUpPageElements = {

};

export const UKCardMigrationPageElements = {
  get templateButton() { return $('#pfsCardCreationTemplate') },
  get uploadButton() { return $('#cardCreationSubmit') },
  get chooseButton() { return $('input[type="file"][name="File"]') },
  get cardHolderId() { return $('//table/tbody/tr[1]/td[3]') },
  get salesForceId() { return $('//table/tbody/tr[1]/td[4]') },
  get status() { return $('//table/tbody/tr[1]/td[5]') },
  get uploadedMessage() { return $('//div[2]/span[contains(.,"The file was uploaded")]') },
};

export const USARolesPageElements = {
  addUser: {
    get selectAccount() { return $('[formcontrolname="extra"]') },
  },
  roleByName(role: string) {
    return $(`//td[@role="gridcell" and contains(.,"${role}")]`);
  },
  roleDetails: {
    get searchInRoleDetails() { return $('//centtrip-input/div/input') },
    get rolesTable() { return $('[class="role-detail__details"]') },
    checkUserByEmail(email: string) {
      return $(`//centtrip-role-detail//div/div[1]/div[2][contains(.,"${email}")]`);
    },
    userRoleBlockByEmail(email: string) {
      return $(`//centtrip-role-detail//div/div[1]/div[2][contains(.,"${email}")]`);
    },
    removeUserRoleButtonByEmail(email: string) {
      return $(`//centtrip-role-detail//div/div[1]/div[2][contains(.,"${email}")]/parent::div/following-sibling::div/mat-icon`);
    },
    get firstUser() { return $('//centtrip-role-detail/div/div[3]/div[2]/div') },
    get removeUser() { return $('[class="user__controls"]') },
    get numberOfRemoveButtons() { return $$('[class="user__controls"]') }
  },
};

export const USAExpensesPageElements = {
  // chooseCorporate: $('//centtrip-autocomplete[2]/centtrip-input/div/input'),
  get filtersButton() { return $('//button[contains(.,"Filters")]') },
  get fieldsButton() { return $('//button[contains(.,"Fields")]') },
  // xlsxButton: $('//button[contains(.,"XLSX")]'),
  // pdfButton: $('//button[contains(.,"PDF")]'),
  get updateButton() { return $('//button[contains(.,"Update")]') },
  // receiptButton: $('//button[contains(.,"Receipt")]'),
  table: {
    get nameOfFirstTransaction() { return $('//table/tbody/tr[1]/td[1]') },
    // addReceiptButtonToFirstTransaction: $('//table/tbody/tr[1]/td[8]/button')
  },
  // recieptImage: $('[class="receipts__img-mask img-mask ng-star-inserted"]'),
  // transactionDetailsReceipts: $('//centtrip-expenses-detail-receipts'),
  // loaderArea: $('[class="receipts"]'),
  // loaderPath: $('input[type="file"][id="file"]'),
  // crossButton: $('[svgicon="cross-grey"]'),
  get selectCorporateAccount() { return $('(//centtrip-input/div/input)[1]') },
  get selectOperatingAccount() { return $('(//centtrip-input/div/input)[2]') },
  get selectCard() { return $('//div[3]/div/mat-form-field/div') },
  // checkAllCards: { return $ }('//centtrip-select-check-all/mat-checkbox')),
  // cardsDropdownBlock: $('//div[@class="cdk-overlay-pane"]/div/div'),
  // dropdownBlocks: $('//div[@class="cdk-overlay-pane"]/div'),
  // userDetails: {},
  transactionsDetails: {
    //   authNum: $('//centtrip-transactions-detail/div[2]/div/div[1]'),
    //   merchantName: $('//centtrip-transactions-detail/div[2]//div[3]'),
    //   amount: $('//centtrip-transactions-detail/div[2]//div[4]'),
    //   amountInternational: $('//centtrip-transactions-detail/div[2]/div/div[8]'),
    //   date: $('[class="company__date-time"]'),
    //   address: $('[class="company__address"]'),
    //   cardName: $('[class="company__holder-name"]'),
    //   cardNumber: $('[class="company__card-numbers"]'),
    //   rate: $('[class="company__rate ng-star-inserted"]'),

    get loaderArea() { return $('[class="receipts__item receipts__item--full"]') },
    get loaderPath() { return $('input[type="file"][id="file"]') },
    // recieptPreview: $('[class="img-mask__btn"]'),
    get recieptImage() { return $('[class="receipts__img-mask img-mask ng-star-inserted"]') },
  },
  columnheaderByName(name: string) {
    return $(`//thead[contains(.,"${name}")]`);
  },
  checkboxByNumber(num: number) {
    return $(`(//centtrip-checkbox/div)[${num}]`);
  },
  cardTransactions: {
    dateOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[1]`);
    },
    typeOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[2]`);
    },
    authOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[3]`);
    },
    ccyOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[5]`);
    },
    amountOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[6]`);
    },
    merchantOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[7]`);
    },
    clearedOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[8]/mat-icon`);
    },
    labelsOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[9]`);
    },
    receiptsOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[10]`);
    },
    sharedBalanceOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[11]/mat-icon`);
    },
    cardNameOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[12]`);
    },
    cardNumberOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[13]`);
    },
    countryOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[14]`);
    },
    stateOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[15]`);
    },
    cityOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[16]`);
    },
    detailsOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[17]`);
    },
    merchantCategoryOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[18]`);
    },
    mccCategoryOfSelectedTransactionRow(row: number) {
      return $(`//table/tbody/tr[${row}]/td[19]`);
    }
  }
};

export const USAUsersPageElements = {
  get usersPage() { return $('[class="users"]') },
  get resendEmail() { return $('//button[contains(.,"Resend email")]') },
  get editUser() { return $('//td/centtrip-button') },
  get selectOperatingAccounts() { return $('(//centtrip-input/div/input)[2]') },
  get searchField() { return $('(//centtrip-input/div/input)[3]') },
  get usersDetailsPopup() { return $('[class="details"]') },
  table: {
    get lastUserRow() { return $('//centtrip-users-list//tbody/tr[2]') },
    get nameOfLastUser() { return $('//centtrip-users-list//table/tbody/tr[1]/td[1]') },
    get emailOfLastUser() { return $('//centtrip-users-list//table/tbody/tr[1]/td[2]') },
    get nameOfSecondUser() { return $('//centtrip-users-list//table/tbody/tr[2]/td[1]') },
    get emailOfSecondUser() { return $('//centtrip-users-list//table/tbody/tr[2]/td[2]') },
    get rolesOfLastUser() { return $('//centtrip-users-list//table/tbody/tr[1]/td[3]') },
    get siteAccessOfLastUser() { return $('//centtrip-users-list//table/tbody/tr[1]/td[4]/mat-icon') },
    get validationOfLastUser() { return $('//centtrip-users-list//table/tbody/tr[1]/td[5]//mat-icon') },
    get openSiteAccess() { return $('[data-mat-icon-name="unlocked"]') }
  },
  userDetails: {
    get userName() { return $('[class="account__name"]') },
    get userEmail() { return $('[class="account__description"]') },
    get userId() { return $('[class="account__code ng-star-inserted"]') },
    get userDateOfBirth() { return $('[class="account__dob"]') },
    get openSiteAccess() { return $('[class="checkbox"]') },
    get closeSiteAccess() { return $('[class="checkbox checkbox--inactive"]') },
    get allAccountBlocks() { return $('[class="corporation__row"]') },
    get editUserButton() { return $('//button[contains(.,"Edit user")]') },
    get block() { return $$('[class="corporation__row corporation__row--seperator ng-star-inserted"]') },
    get validationTrue() { return $('.cdk-column-emailConfirmed [data-mat-icon-name="checkmark"]') },
    get closeButton() { return $('[data-mat-icon-name="cross-black"]') }
  },
  get arrayOfEditButtons() { return $$('[svgicon="edit-outline"]') },
};

export const USAManageCardsPageElements = {
  get manageCardsPage() { return $('.manage-cards') },
  get manageCardsTableHeaders() { return $('[role="columnheader"]') },
  get cardOrdersTabLink() { return $('[href="/manage/orders"]') },
  get closeNotification() { return $('//section/div/div/mat-icon[2]') },
  get batchCardResultTabLink() { return $('[href="/manage/batch-results"]') },
  get batchCardPage() { return $('.card-results') },
  get selectAccount() { return $('(//centtrip-input/div/input)[2]') },
  get searchField() { return $('[placeholder="Search"][type="text"]') },
  get balanceTable() { return $('.balance__table') },
  get transactionsTable() { return $('.transactions__table') },
  get transactionsTabLink() { return $('[href="/transactions/list"]') },
  table: {
    rowByName(name: string) {
      return $(`//tr[@role="row" and contains(.,"${name}")]`);
    },
    get nameOfLastCard() { return $('//centtrip-manage-cards-list//table/tbody/tr[1]/td[3]') },
  },
  cardOrders: {
    get corporateField() { return $('//centtrip-card-orders//centtrip-input/div/input') },
    get operatingAccountField() { return $('(//centtrip-card-orders//centtrip-input/div/input)[2]') },
    get selectDeliveryType() { return $('[class="delivery-type__input-label"]') },
    get selectDeliveryAddress() { return $('//centtrip-card-orders-delivery-type//centtrip-radio-button/div/div[1]') },
    get selectLastDeliveryAddress() { return $('//centtrip-card-orders-delivery-type//centtrip-radio-button[last()]') },
    get addDeliveryAddressButton() { return $('.delivery-address__button-text--black') },
    get editDeliveryAddress() { return $('[svgicon="edit-outline"]') },
    get deliveryAddressSecondStep() { return $('(//div[@class="file-select__text"])[4]') },
    get nextButtonDelivery() { return $('(//button[contains(.,"Next")])[2]') },
    get uploadFileButton() { return $('.loader__text__bold') },
    get uploadFileInput() { return $('#file') },
    get nextButtonSelectFile() { return $('(//button[contains(.,"Next")])[3]') },
    get errorsFirstRow() { return $('//centtrip-card-orders-checking-data//table/tbody/tr[1]') },
    get successMessage() { return $('.done-step__header') },
    editDeliveryAddressByNumber(num: number) {
      return $(`[svgicon="edit-outline"]:nth-last-child(${num})`)
    }
  },
  batchCardResult: {
    get dateOfLastCard() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[1]') },
    get userOfLastCard() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[2]') },
    get corporateOfLastCard() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[3]') },
    get accountNameOfLastCard() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[4]') },
    get totalCardsOfLastCard() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[6]') },
    get successfulCards() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[7]') },
    get successStatusOfLastCard() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[5][contains(.,"Completed successfully")]') },
    get progressStatusOfLastCard() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[5][contains(.,"In progress")]') },
    get failedCards() { return $('//centtrip-card-results-list//table/tbody/tr[1]/td[8]') },
    get refreshBatchCardResults() { return $('//*[@class="refresh-button__button-text"]') },
    get tableResults() { return $('.table-container') },
  },
  get inactiveCardLabel() { return $('[class="list-wrapper__inactive-pan ng-star-inserted"]') },
  get manageCardsTable() { return $('[role="columnheader"]') },
  details: {
    get cardDetailsWindow() { return $('.details__content') },
    get manageLimitsButton() { return $('.mat-icon notranslate pointer mat-icon-no-color ng-star-inserted') },
    limits: {
      get maxDailySpendField() { return $('//div[contains(text(),"daily")]/following-sibling::div/div[2]/div[2]') },
      get cardDailySpendField() { return $('//div[contains(text(),"daily")]/following-sibling::div/div[1]/div[2]') },
      get dailySpendLimit() { return $('//centtrip-manage-cards-detail/div/div/div[3]/div[4]/div[2]/div[1]/div[2]') },
      get maxDailyFieldSpent() { return $('//centtrip-manage-cards-detail//div[3]/div[3]/div[4]') },
      get maxMonthlySpendField() { return $('//div[contains(text(),"monthly")]/following-sibling::div/div[2]/div[2]') },
      get cardMonthlySpendField() { return $('//div[contains(text(),"monthly")]/following-sibling::div/div[1]/div[2]') },
      get atmLimitPerDayField() { return $('//div[contains(text(),"day")]/following-sibling::div/div[2]/div[2]') },
      get atmCardLimitPerDayField() { return $('//div[contains(text(),"day")]/following-sibling::div/div[1]/div[2]') },
      get atmLimitPerDayFieldSpent() { return $('//centtrip-manage-cards-detail//div[3]/div[2]/div[4]') },
      get atmLimitPerMonthField() { return $('//div[contains(text(),"per month")]/following-sibling::div/div[2]/div[2]') },
      get atmCardPerMonthField() { return $('//div[contains(text(),"per month")]/following-sibling::div/div[1]/div[2]') },
      get perMonthSpent() { return $('(//div[@class="limits__progress-inner"])[4]') },
      get maxTransactionAmountField() { return $('//div[contains(text(),"transaction")]/following-sibling::div/div[2]/div[2]') },
      get cardTransactionAmountField() { return $('//div[contains(text(),"transaction")]/following-sibling::div/div[1]/div[2]') }
    }
  },
  manageLimits:
  {
    get manageLimitsHeader() { return $('.limits__heading') },
    get crossButton() { return $('//centtrip-manage-cards-limits/div/div[1]/mat-icon') },
    get maxDailySpendField() { return $('//centtrip-manage-cards-limits//div[2]/div[1]/centtrip-input/div/input') },
    get maxMonthlySpendField() { return $('//centtrip-manage-cards-limits//div[2]/div[2]/centtrip-input/div/input') },
    get atmDaylimitField() { return $('//centtrip-manage-cards-limits//div[3]/div[1]/centtrip-input/div/input') },
    get atmMonthlimitField() { return $('//centtrip-manage-cards-limits//div[3]/div[2]/centtrip-input/div/input') },
    get maxSingleTransactionField() { return $('//centtrip-manage-cards-limits//div[4]/div[1]/centtrip-input/div/input') },
    get saveButton() { return $('//button[contains(.,"Save")]') }
  },
};

export const USACreateUserPageElements = {
  get emailField() { return $('(//*[@placeholder="Enter email"])[2]') },
  get matchedEmailTip() { return $('[class="cdk-overlay-pane"]') },
  get firstName() { return $('(//*[@placeholder="Enter first name"])[2]') },
  //   firstNameClear: $('//div[3]/centtrip-input/div/input'),
  get lastName() { return $('(//*[@placeholder="Enter last name"])[2]') },
  //   lastNameClear: $('//div[4]/centtrip-input/div/input'),
  //   dateOfBirth: $('[formcontrolname="dateOfBirth"]'),
  get gender() { return $('[formcontrolname="gender"]') },
  //   genderSelected: $('//centtrip-user-edit//div[6]//span/span'),
  get genderSelected() { return $('//centtrip-user-edit//div[6]//span/span') },
  get country() { return $('[formcontrolname="country"]') },
  get monthSelectedCreate() { return $('//centtrip-user-create//div[5]//mat-form-field[1]//span/span') },
  //   monthSelected: $('//centtrip-user-edit//div[5]//mat-form-field[1]//span/span'),
  get monthSelected() { return $('//centtrip-user-edit//div[5]//mat-form-field[1]//span/span') },
  get daySelectedCreate() { return $('//centtrip-user-create//div[5]//mat-form-field[2]//span/span') },
  //   daySelected: $('//centtrip-user-edit//div[5]//mat-form-field[2]//span/span'),
  get daySelected() { return $('//centtrip-user-edit//div[5]//mat-form-field[2]//span/span') },
  get city() { return $('(//*[@placeholder="City"])[2]') },
  get state() { return $('[formcontrolname="state"]') },
  get street() { return $('(//*[@placeholder="Street"])[2]') },
  get postalCode() { return $('(//*[@placeholder="Enter postal code"])[2]') },
  get phoneNumber() { return $('(//*[@placeholder="Enter phone number"])[2]') },
  //   phoneNumberClear: $('//div[12]/centtrip-input/div/input'),
  //   clearButton: $('[class="clear ng-star-inserted"]'),
  get userRoleFirst() { return $('[formcontrolname="role"]') },
  get userRoleSecond() { return $('(//div[2]/div[2]//mat-select//div//span)[3]') },
  get centripRoles() { return $('span*=Centtrip roles') },
  get customRoles() { return $('//mat-radio-button[2]/label/span[2]') },
  get completeMessage() { return $('.form__done-header') },
  //   usersPage: $('[class="users"]'),
  //   createUserHeader: $('[class="form__page-name"]'),
  //   userRoleArray: $$('[class="form__input-container form__input-container--role"]'),
  get createUserButton() { return $('//button[contains(.,"Create user")]') },
  get nextButton() { return $('span*=Create') },
  get finishButton() { return $('//button[contains(.,"Finish")]') },
  get addNewRoleButton() { return $('button*=Add new') },
  get removeRoleButton() { return $('//span[contains(.,"Remove")]') },
  //   contactDetailStep: $('//centtrip-stepper/section/div[1]/div[1]/span[2]'),
  selectResourse: {
    get selectResourseButton() { return $('//button[contains(.,"Add resource")]') },
    //     selectResourseModal: $('[class="user-add ng-pristine ng-invalid ng-touched"]'),
    get selectCorporateField() { return $('//div[2]/mat-form-field[1]//mat-select/div/div[1]') },
    get selectAccessField() { return $('[formcontrolname="resourceType"]') },
    get alertImage() { return $('//mat-form-field[1]/div/div[1]/div/div/mat-icon') },
    get selectButton() { return $('//*[@class="mat-button-wrapper" and contains(.,"Select")]') },
  },
  //   validationError: $('[class="validator__error ng-star-inserted"]'),

  placeholderByName(name: string) {
    return $(`[placeholder="${name}"][type="text"]`);
  },

  get monthField() { return $('[formcontrolname="month"]') },
  get dayField() { return $('[formcontrolname="day"]') },
  get yearField() { return $('//centtrip-date-select/div/centtrip-input//input') },
};

export const signUpUSAPageElements = {
  createPassword: {
    get passField() { return $('[id="NewPassword"]') },
    get confirmPassField() { return $('[id="ConfirmNewPassword"]') },
    get submitButton() { return $('[type="submit"]') },
  }
};

export const receiveSMSServicePageElements = {
  availablePhoneNumber(num: number) {
    return $(`//tbody/tr[${num}]/td[3]`);
  },
};

export const dashboardPageElements = {
  get selectCorporate() { return $('//centtrip-autocomplete[1]/centtrip-input/div/input') },
  get selectAccount() { return $('//centtrip-autocomplete[2]/centtrip-input/div/input') },
  get accountName() { return $('.balance__header') },
  get fromAccount() { return $('[formcontrolname="fromAccountCodeRefId"]') },
  get toAccount() { return $('[formcontrolname="toAccountCodeRefId"]') },
  get toAccountInputStatus() { return $('(//mat-form-field/div/div[1]/div[1]/input)[2]') },
  get amountField() { return $('[formcontrolname="amount"]') },
  get accountBalance() { return $('//centtrip-account-total-balance//div[2]/div[2]/div[1]/span[1]') },
  get totalBalance() { return $('[class="balance__total-digits ng-star-inserted"]') },
  get transferSucessModal() { return $('//div[contains(text(),"Transfer request successful")]') },
  get cardBalance() { return $('//centtrip-account-total-balance//div[2]/div[3]/div[1]/span[1]') },
  get modalCloseButton() { return $('[class="transfer-button"]') },
  get soureOfFundsTab() { return $('//mat-tab-header/div[2]/div/div/div[3]') },
  soureOfFunds: {
    get soureOfFundsAccountName() { return $('//centtrip-funds-section/div/div/div/div[1]/div[2]') },
  },
  recentTransactions: {
    get dateOflastTransactionRow() { return $('//centtrip-transactions//tbody/tr[1]/td[1]') },
    get typeOflastTransactionRow() { return $('//centtrip-transactions//tbody/tr[1]/td[2]') },
    get cardNameOflastTransactionRow() { return $('//centtrip-transactions//tbody/tr[1]/td[3]') },
    get ccyOflastTransactionRow() { return $('//centtrip-transactions//tbody/tr[1]/td[4]') },
    get amountOflastTransactionRow() { return $('//centtrip-transactions//tbody/tr[1]/td[5]') },
    get detailsOflastTransactionRow() { return $ ('//centtrip-transactions//tbody/tr[1]/td[6]') },
    dateOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions//tbody/tr[${row}]/td[1]`);
    },
    typeOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions//tbody/tr[${row}]/td[2]`);
    },
    cardNameOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions//tbody/tr[${row}]/td[3]`);
    },
    ccyOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions//tbody/tr[${row}]/td[4]`);
    },
    amountOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions//tbody/tr[${row}]/td[5]`);
    },
    detailsOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions//tbody/tr[${row}]/td[6]`);
    }
  }
};

export const masterDashboardPageElements = {
  get accountDescription() { return $('[class="accounts__description"]') },
  get totalbalance() { return $('(//div[@class="balance__sum"])[1]') },
  get primaryAccount() { return $('(//div[@class="balance__sum"])[2]') },
  accountBalenceByNum(num: number) {
    return $(`(//div[@class="accounts__description"])[${num}]`);
  },
  get arrayOfAccounts() { return $$('//div[@class="accounts__description"]') },
  get operatingAccountBalance() { return $('(//div[@class="balance__sum"])[3]') },
};

export const USAAccountsPageElements = {
  get selectCorporate() { return $('//centtrip-multiple-autocomplete/centtrip-input/div/input') },
  get selectAccountType() { return $('//div/mat-select') },
  get searchField() { return $('[formcontrolname="search"]') },
  get accountBalanceOfLastAccount() { return $('//centtrip-account-list//table//tr[1]/td[6]') },
  accountBalenceByNum(num: number) {
    return $(`//table/tbody/tr[${num}]/td[6]`);
  },
  get accountsTable() { return $('[class="accounts__table"]') },
  get linkButtonForTheLastAccount() { return $('//centtrip-account-list-table//tr[1]/td[2]/div/mat-icon') },
  get accountNameOfLastAccount() { return $('//centtrip-account-list//table//tr[1]/td[2]/div') },
  get dateOfLastAccount() { return $('//centtrip-account-list//table//tr[1]/td[3]') },
  get accountTypeOfLastAccount() { return $('//centtrip-account-list//table//tr[1]/td[4]') },
  get accountStatusOfLastAccount() { return $('//centtrip-account-list//table//tr[1]/td[5]') },
  get lastAccount() { return $('(//centtrip-account-list//table//tr)[2]') },
  accountDetails: {
    get corporateName() { return $('[class="address__description"]') },
    get accountName() { return $('[centtripcustomtooltipclass="address__name-tooltip"]') },
    get accountStatus() { return $('[class="address__status"]') },
    get accountDescription() { return $('(//div[@class="address__row"]/div)[4]') },
    get accountId() { return $('(//div[@class="address__value"])[3]') },
    get dateCreation() { return $('//centtrip-account-details/div/div/div[1]/div[2]/div[1]/div[2]') },
    get accountType() { return $('//div[contains(text(),"Account type")]/following-sibling::*') },
    limits: {
      get maxDailySpend() { return $('(//div[@class="limits__row"]/div[2])[1]') },
      get maxMonthlySpend() { return $('(//div[@class="limits__row"]/div[2])[2]') },
      get maxSingleTransc() { return $('(//div[@class="limits__row"]/div[2])[3]') },
      get maxDailyAtmSpend() { return $('(//div[@class="limits__row"]/div[2])[4]') },
      get maxMonthlyAtmSpend() { return $('(//div[@class="limits__row"]/div[2])[5]') }
    },
    deliveryAddress: {
      get contactName() { return $('(//div[@class="address__value"])[5]') },
      get corporateName() { return $('(//div[@class="address__value"])[6]') },
      get country() { return $('(//div[@class="address__value"])[7]') },
      get state() { return $('(//div[@class="address__value"])[8]') },
      get city() { return $('(//div[@class="address__value"])[9]') },
      get street() { return $('(//div[@class="address__value"])[10]') },
      get houseNumber() { return $('(//div[@class="address__value"])[11]') },
      get postalCode() { return $('(//div[@class="address__value"])[12]') }
    }
  }
};

export const statementsPageElements = {
  get selectCorporate() { return $('(//centtrip-input/div/input)[1]') },
  get selectDepartament() { return $('(//centtrip-input/div/input)[2]') },
  get selectAccount() { return $('(//centtrip-input/div/input)[3]') },
  get statusOfLastTransaction() { return $('//tbody/tr[1]/td[5]/div/mat-icon') },
};

export const USATransactionsPageElements = {
  balance: {
    get collapseButton() { return $('.collapse-btn collapse-btn--expanded') },
    get selectOperatingAccountField() { return $('(//centtrip-transactions-balance-header//centtrip-input/div/input)[1]') },
    get selectAccountField() { return $('(//centtrip-transactions-balance-header//centtrip-input/div/input)[2]') },
  },
  balanceTransactions: {
    typeOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions-balance-list//table/tbody/tr[${row}]/td[2]`);
    },
    amountOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions-balance-list//table/tbody/tr[${row}]/td[4]`);
    },
    statusOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions-balance-list//table/tbody/tr[${row}]/td[5]//mat-icon`);
    },
    detailsAfterOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions-balance-list//table/tbody/tr[${row}]/td[7]`);
    },
    recipientOfSelectedTransactionRow(row: number) {
      return $(`//centtrip-transactions-balance-list//table/tbody/tr[${row}]/td[9]`);
    },
  }
};

export const applicationServiceMainPageElements = {
  general: {
    get appSection() { return $('[class="application-section"]') },
    get signOutWindow() { return $('//div[contains(text(),"You are now signed out")]') },
    get signOutButton() { return $('[class="logout-text"]') },
    get signOutSubmitButton() { return $('//div//button[contains(text(),"Sign out")]') },
    get returnToSignInButton() { return $('//a[contains(text(),"Return to Application Portal")]') }
  },
  functionality: {
    get newAppButton() { return $('.application-head-new-button-link') },
    selectRegionButton(region: string) {
      return $(`[class="option-strip"][data-region="${region}"]`);
    },
    get searchButton() { return $('.application-head-new-button-link search-button') },
  },
  selectRegion: {
    get continueButton() { return $('.btn btn-default btn-continue') },
  },
  other: {
    get searchInput() { return $('#search-input') },
  },
  listOfAppsUSA: {
    get startKYCButton() { return $('.start-kyc-button') },
    get statusOfLastCompany() { return $('//table/tbody/tr[1]/td[4]') },
  }
};

export const startKYCElements = {
  get modal() { return $('[class="start-kyc-modal"]') },
  get startButton() { return $('[value="Start"]') },
  corporateInformation: {
    get legalName() { return $('[id="corporate-name"]') },
    get type() { return $('[id="corporate-type"]') }
  },
};

export const USAProvisioningPageElements = {
  get createCorporateButton() { return $('//button[contains(.,"Create Corporate")]') },
  get statusOfLastCorporate() { return $('//table/tbody/tr[1]/td[4]') },
  get createCsaButton() { return $('//button[contains(.,"Create CSA")]') },
  get createAccountButton() { return $('//button[contains(.,"Create Account")]') },
  get searchField() { return $('[placeholder="Search"][type="text"]') },
  createCorporate: {
    get createButton() { return $('//button[contains(.,"Create")]') },
    get finishButton() { return $('//button[contains(.,"Finish")]') },
    get nextStepButton() { return $('//button[contains(.,"Next step")]') },
    get selectSubField() { return $('(//mat-form-field/div/div)[1]') },
    get corporateData() { return $('[class="form__corporate-info corporate-info ng-star-inserted"]') },
    get corporateName() { return $('div:nth-child(1) > div.corporate-info__value') },
    get selectLimitsField() { return $('(//mat-form-field//mat-select)[3]') },
    get cardStyleField() { return $('[formcontrolname="cardStyle"]') },
    get postCode() { return $('div:nth-child(2) > div.corporate-info__value') },
    get street() { return $('div:nth-child(4) > div.corporate-info__value') },
    get city() { return $('div:nth-child(5) > div.corporate-info__value') },
    get state() { return $('div:nth-child(6) > div.corporate-info__value') },
    get country() { return $('div:nth-child(7) > div.corporate-info__value') },
    get phoneType() { return $('div:nth-child(8) > div.corporate-info__value') },
    get phoneNumber() { return $('div:nth-child(9) > div.corporate-info__value') },
    get email() { return $('div:nth-child(10) > div.corporate-info__value') },
  },
  createCsa: {
    get supperAdminInfo() { return $('(//*[contains(./@id, "cdk-step-content")])[1]') },
    get email() { return $('(//centtrip-input/div/input)[1]') },
    get firstName() { return $('//input[@placeholder="Enter first name"]') },
    get lastName() { return $('(//centtrip-input/div/input)[3]') },
    get monthOfBirth()  { return $('(//*[contains(./@id, "mat-select-value")]/span/span)[1]') },
    get dayOfBirth()  { return $('(//*[contains(./@id, "mat-select-value")]/span/span)[2]') },
    get yearOfBirth()  { return $('//input[@placeholder="Year"]') }
  },
  createAccount: {
    get accountData() { return $('[class="form__corporate-name"]') },
    get createButton() { return $('//button[contains(.,"Create")]') },
    get accountNameFieldInput() { return $('//div/centtrip-input/div/input') },
  }
};  