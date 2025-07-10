import MoreQuestions from "@/components/MoreQuestions";
import Section from "@/components/utils/Section";
import Link from "next/link";

const Content = [
  "Interpretation and Definitions",
  "Types of Data Collected",
  "Use of Your Personal Data",
  "Healthcare Services",
  "Retention of Your Personal Data",
  "Transfer of Your Personal Data",
  "Security of Your Personal Data",
  "Analytics",
  "Advertising",
  "Email Marketing",
  "Payments",
  "Usage, Performance and Miscellaneous",
  "Contact Us",
];

export default function privacyPolicy() {
  return (
    <Section>
      <div className="mb-10 md:mb-14">
        <h1 className="text-[40px] md:text-[60px] leading-[115%] font-[550] tracking-[-0.01em] md:tracking-[-0.02em] mb-3 md:mb-4 headers-font">
          Privacy policy
        </h1>
        <p className="text-[16px] mb-4  md:text-[18px] leading-[140%] font-[400]">
          Last updated: July 2025
        </p>
      </div>
      <div className="md:flex gap-[120px]">
        <div className="md:w-[784px]">
          <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] mb-10 md:mb-14">
            <p>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>

            <p>
              We use your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.
            </p>
          </div>
          {/* Mobile */}
          <ol className="md:hidden  space-y-4 mb-4 list-decimal list-inside mb-10">
            {Content.map((text, index) => (
              <li
                key={index}
                className="underline text-[16px] mb-4  leading-[140%] font-[500]"
              >
                <a href={`#${text.toLowerCase().replace(/\s+/g, "-")}`}>
                  {text}
                </a>
              </li>
            ))}
          </ol>

          {/* Interpretation and Definitions  */}
          <div id="interpretation-and-definitions" className="mb-10 md:mb-14">
            <h2 className="text-[18px] md:text-[20px] text-[#AE7E56] leading-[140%] font-[500] mb-4 md:mb-6">
              Interpretation and Definitions
            </h2>
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-4 md:mb-6 headers-font">
              Interpretation
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] text-[#000000D9] mb-6">
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-4 md:mb-6 headers-font">
              Definitions
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              For the purposes of this Privacy Policy:
            </p>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Account </span>means a unique account
              created for You to access our Service or parts of our Service.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Authorized Healthcare Providers </span>means licensed professional healthcare providers delivering treatment to You through the Service, which may include, without limitation physicians, pharmacists, or nurse practitioners.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Company </span>(referred to as either
              “the Company”, “We”, “Us” or “Our” in this Agreement) refers to
              Rocky Health Inc., 30 Wellington Street West, Toronto, Ontario.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Cookies </span>are small files that
              are placed on Your computer, mobile device or any other device by
              a website, containing the details of Your browsing history on that
              website among its many uses.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Country </span>refers to: Ontario,
              Canada
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Device </span>means any device that
              can access the Service such as a computer, a cellphone or a
              digital tablet.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">HIPAA </span>means licensed professional healthcare providers delivering treatment to You through the Service, which may include, without limitation physicians, pharmacists, or nurse practitioners.
            </div>


            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Personal Data </span>is any
              information that relates to an identified or identifiable
              individual.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Service </span>refers to the Website.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Service Provider </span>means any
              natural or legal person who processes the data on behalf of the
              Company. It refers to third-party companies or individuals
              employed by the Company to facilitate the Service, to provide the
              Service on behalf of the Company, to perform services related to
              the Service or to assist the Company in analyzing how the Service
              is used.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">
                Third-party Social Media Service{" "}
              </span>
              refers to any website or any social network website through which
              a User can log in or create an account to use the Service.
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Usage Data </span>
              refers to data collected automatically, either generated by the
              use of the Service or from the Service infrastructure itself (for
              example, the duration of a page visit).
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <span className="font-[600] opacity-100 mt-4 mb-4">Website </span>
              means the content and information available {" "}
              <Link
                href="/"
                className="duration-300 hover:text-gray-800 underline "
              >
                www.myrocky.com
              </Link>
            </div>

            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              <span className="font-[600] opacity-100 mt-4 mb-4">You </span>
              means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
            </div>
          </div>
          {/* Types of Data Collected */}
          <div id="types-of-data-collected" className="mb-10 md:mb-14">
            <h2 className="text-[18px] md:text-[20px] text-[#AE7E56] leading-[140%] font-[500] mb-4 md:mb-6 max-w-[306] md:max-w-full">
              Collecting and Using Your Personal Data
            </h2>
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Types of Data Collected
            </div>
            <div className="mb-6 text-[16px] mb-4  md:text-[18px] font-[400] leading-[160%]">
              <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-4 headers-font">
                Personal Data
              </div>
              <p>
                While using Our Service, we may ask You to provide Us with
                certain personally identifiable information that can be used to
                contact or identify You. Personally identifiable information may
                include, but is not limited to:
              </p>

              <ul className="space-y-4 mb-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li> Bank account information in order to pay for products and/or
                  services within the Service</li>
              </ul>


              <span className="block mb-2 mt-2">Usage Data</span>

              <p>
                When You pay for a product and/or a service via bank transfer,
                We may ask You to provide information to facilitate this
                transaction and to verify Your identity. Such information may
                include, without limitation:
              </p>

              <ul className="space-y-1 list-disc ml-6 md:ml-8">
                <li>Date of birth</li>
                <li>Passport or National ID card</li>
                <li>Bank card statement</li>
                <li>Other information linking You to an address</li>
              </ul>
            </div>
            <div className="mb-6 text-[16px]   md:text-[18px] font-[400] leading-[160%]">
              <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-4 headers-font">
                Usage Data
              </div>
              <p>
                Usage Data is collected automatically when using the Service.
              </p>
              <p>
                Usage Data may include information such as Your Device’s
                Internet Protocol address (e.g. IP address), browser type,
                browser version, the pages of our Service that You visit, the
                time and date of Your visit, the time spent on those pages,
                unique device identifiers and other diagnostic data.
              </p>
              <p>
                When You access the Service by or through a mobile device, We
                may collect certain information automatically, including, but
                not limited to, the type of mobile device You use, Your mobile
                device unique ID, the IP address of Your mobile device, Your
                mobile operating system, the type of mobile Internet browser You
                use, unique device identifiers and other diagnostic data
              </p>
              <p>
                We may also collect information that Your browser sends whenever
                You visit our Service or when You access the Service by or
                through a mobile device.
              </p>
            </div>
            <div className="mb-6 text-[16px] mb-4  md:text-[18px] font-[400] leading-[160%]">
              <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-4 headers-font">
                Information from Third-Party Social Media Services
              </div>
              <p>
                The Company allows You to create an account and log in to use
                the Service through the following Third-party Social Media
                Services:
              </p>

              <ul className="space-y-` list-disc ml-6 md:ml-8">
                <li>Google</li>
                <li>Facebook</li>
                <li>Twitter</li>
              </ul>

              <p>
                If You decide to register through or otherwise grant us access
                to a Third-Party Social Media Service, We may collect Personal
                data that is already associated with Your Third-Party Social
                Media Service’s account, such as Your name, Your email address,
                Your activities or Your contact list associated with that
                account.
              </p>

              <p>
                You may also have the option of sharing additional information
                with the Company through Your Third-Party Social Media Service’s
                account. If You choose to provide such information and Personal
                Data, during registration or otherwise, You are giving the
                Company permission to use, share, and store it in a manner
                consistent with this Privacy Policy.
              </p>
            </div>
            <div className="mb-6 text-[16px] mb-4  md:text-[18px] font-[400] leading-[160%]">
              <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-4 headers-font">
                Tracking Technologies and Cookies
              </div>
              <p>
                We use Cookies and similar tracking technologies to track the
                activity on Our Service and store certain information. Tracking
                technologies used are beacons, tags, and scripts to collect and
                track information and to improve and analyze Our Service. The
                technologies We use may include:
              </p>

              <ul className="space-y-2 list-disc ml-6 md:ml-8">
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">
                    Cookies or Browser Cookies:{" "}
                  </span>
                  A cookie is a small file placed on Your Device. You can
                  instruct Your browser to refuse all Cookies or to indicate
                  when a Cookie is being sent. However, if You do not accept
                  Cookies, You may not be able to use some parts of our Service.
                  Unless you have adjusted Your browser setting so that it will
                  refuse Cookies, our Service may use Cookies
                </li>
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">Flash Cookies: </span>
                  Certain features of our Service may use local stored objects
                  (or Flash Cookies) to collect and store information about Your
                  preferences or Your activity on our Service. Flash Cookies are
                  not managed by the same browser settings as those used for
                  Browser Cookies. For more information on how You can delete
                  Flash Cookies, please read “Where can I change the settings
                  for disabling, or deleting local shared objects?” available at{" "}
                  <a
                    className="duration-300 hover:text-gray-800 hover:underline break-all"
                    href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_"
                  >
                    https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_
                  </a>
                </li>
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">Web Beacons: </span>
                  Certain sections of our Service and our emails may contain
                  small electronic files known as web beacons (also referred to
                  as clear gifs, pixel tags, and single-pixel gifs) that permit
                  the Company, for example, to count users who have visited
                  those pages or opened an email and for other related website
                  statistics (for example, recording the popularity of a certain
                  section and verifying system and server integrity).
                </li>
              </ul>

              <p>
                Cookies can be “Persistent” or “Session” Cookies. Persistent
                Cookies remain on Your personal computer or mobile device when
                You go offline, while Session Cookies are deleted as soon as You
                close Your web browser.
              </p>

              <p>
                We use both Session and Persistent Cookies for the purposes set
                out below:
              </p>

              <p className="font-[600] opacity-100 mt-4 mb-4">Necessary / Essential Cookies</p>

              <p>Type: Session Cookies</p>

              <p>Administered by: Us</p>

              <p>
                Purpose: These Cookies are essential to provide You with
                services available through the Website and to enable You to use
                some of its features. They help to authenticate users and
                prevent fraudulent use of user accounts. Without these Cookies,
                the services that You have asked for cannot be provided, and We
                only use these Cookies to provide You with those services.
              </p>

              <p className="font-[600] opacity-100 mt-4 mb-4">
                Cookies Policy / Notice Acceptance Cookies
              </p>

              <p>Type: Persistent Cookies</p>

              <p>Administered by: Us</p>

              <p>
                Purpose: These Cookies identify if users have accepted the use
                of cookies on the Website.
              </p>

              <p className="font-[600] opacity-100 mt-4 mb-4">Functionality Cookies</p>

              <p>Type: Persistent Cookies</p>

              <p>Administered by: Us</p>

              <p>
                Purpose: These Cookies allow us to remember choices You make
                when You use the Website, such as remembering your login details
                or language preference. The purpose of these Cookies is to
                provide You with a more personal experience and to avoid You
                having to re-enter your preferences every time You use the
                Website.
              </p>

              <p className="font-[600] opacity-100 mt-4 mb-4">Tracking and Performance Cookies</p>

              <p>Type: Persistent Cookies</p>

              <p>Administered by: Third-Parties</p>

              <p>
                Purpose: These Cookies are used to track information about
                traffic to the Website and how users use the Website. The
                information gathered via these Cookies may directly or
                indirectly identify you as an individual visitor. This is
                because the information collected is typically linked to a
                pseudonymous identifier associated with the device you use to
                access the Website. We may also use these Cookies to test new
                pages, features or new functionality of the Website to see how
                our users react to them.
              </p>

              <p className="font-[600] opacity-100 mt-4 mb-4">Targeting and Advertising Cookies</p>

              <p>Type: Persistent Cookies</p>

              <p>Administered by: Third-Parties</p>

              <p>
                Purpose: These Cookies track your browsing habits to enable Us
                to show advertising which is more likely to be of interest to
                You. These Cookies use information about your browsing history
                to group You with other users who have similar interests. Based
                on that information, and with Our permission, third party
                advertisers can place Cookies to enable them to show adverts
                which We think will be relevant to your interests while You are
                on third party websites.
              </p>

              <p>
                For more information about the cookies we use and your choices
                regarding cookies, please visit our Cookies Policy or the
                Cookies section of our Privacy Policy.
              </p>
            </div>
          </div>
          {/* Use of Your Personal Data */}
          <div id="use-of-your-personal-data" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Use of Your Personal Data
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
              The Company may use Personal Data for the following purposes:
            </p>
            <div className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">
                  To provide and maintain our Service:{" "}
                </span>
                including to monitor the usage of our Service.
              </p>

              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">To manage Your Account: </span>
                to manage Your registration as a user of the Service. The
                Personal Data You provide can give You access to different
                functionalities of the Service that are available to You as a
                registered user.
              </p>

              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">
                  For the performance of a contract:{" "}
                </span>
                the development, compliance and undertaking of the purchase
                contract for the products, items or services You have purchased
                or of any other contract with Us through the Service.
              </p>

              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">To contact You: </span>
                To contact You by email, telephone calls, SMS, or other
                equivalent forms of electronic communication, such as a mobile
                application’s push notifications regarding updates or
                informative communications related to the functionalities,
                products or contracted services, including the security updates,
                when necessary or reasonable for their implementation.
              </p>

              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">To provide You </span>
                with news, special offers and general information about other
                goods, services and events which we offer that are similar to
                those that you have already purchased or enquired about unless
                You have opted not to receive such information.
              </p>

              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">To manage Your requests: </span>
                To attend and manage Your requests to Us.
              </p>

              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">For business transfers: </span>
                We may use Your information to evaluate or conduct a merger,
                divestiture, restructuring, reorganization, dissolution, or
                other sale or transfer of some or all of Our assets, whether as
                a going concern or as part of bankruptcy, liquidation, or
                similar proceeding, in which Personal Data held by Us about our
                Service users is among the assets transferred.
              </p>

              <p>
                <span className="font-[600] opacity-100 mt-4 mb-4">For other purposes: </span>
                We may use Your information for other purposes, such as data
                analysis, identifying usage trends, determining the
                effectiveness of our promotional campaigns and to evaluate and
                improve our Service, products, services, marketing and your
                experience.
              </p>

              <p>
                We may share Your personal information in the following
                situations:
              </p>

              <ul className="space-y-3 list-disc ml-6 md:ml-8">
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">With Service Providers: </span>
                  We may share Your personal information with Service Providers
                  to monitor and analyze the use of our Service, to show
                  advertisements to You to help support and maintain Our
                  Service, for payment processing, to contact You.
                </li>
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">For business transfers: </span>
                  We may share or transfer Your personal information in
                  connection with, or during negotiations of, any merger, sale
                  of Company assets, financing, or acquisition of all or a
                  portion of Our business to another company.
                </li>
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">With Affiliates: </span>
                  We may share Your information with Our affiliates, in which
                  case we will require those affiliates to honor this Privacy
                  Policy. Affiliates include Our parent company and any other
                  subsidiaries, joint venture partners or other companies that
                  We control or that are under common control with Us.
                </li>
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">With business partners: </span>
                  We may share Your information with Our business partners to
                  offer You certain products, services or promotions.
                </li>
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">With other users: </span>
                  when You share personal information or otherwise interact in
                  the public areas with other users, such information may be
                  viewed by all users and may be publicly distributed outside.
                  If You interact with other users or register through a
                  Third-Party Social Media Service, Your contacts on the
                  Third-Party Social Media Service may see Your name, profile,
                  pictures and description of Your activity. Similarly, other
                  users will be able to view descriptions of Your activity,
                  communicate with You and view Your profile.
                </li>
                <li>
                  <span className="font-[600] opacity-100 mt-4 mb-4">With Your consent: </span>
                  We may disclose Your personal information for any other
                  purpose with Your consent.
                </li>
              </ul>
            </div>
          </div>
          {/* Healthcare Services */}
          <div id="healthcare-services" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Healthcare Services
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              Rocky Authorized Healthcare Providers may collect Information about you or any Registered Dependent (as defined below) when you provide it during a Healthcare Services consultation (e.g., verbally or in texts), by viewing the Information that you have entered or uploaded to the Rocky Health Platform and/or by creating or compiling Information in the Rocky Health Platform. Information that will be available to Authorized Healthcare Providers and includes: the details that you provide in your consultation request; information you’ve entered or uploaded to profiles and medical records; information created during earlier interactions through the Rocky Health Platform with other Authorized Healthcare Providers and/or; the name, email address, phone number, gender and date of birth and province/territory that you provided when you registered; and your emergency contact’s name and contact information. Authorized Healthcare Providers use Information to provide you with Healthcare Services and/or Informational Services and, as with any healthcare provider, must comply with the privacy legislation and medical record-keeping obligations to which they are subject. Authorized Healthcare Providers may create Information such as prescriptions, sick notes and other notes about your interaction with them through the Rocky Health Platform. They may export or print copies of your Information that they collect. Authorized Healthcare Providers may, but are not required to email or text your emergency contact if they believe that you are dealing with a medical emergency during a consultation. You are responsible for advising your emergency contact that you are providing their name and contact information to Rocky Health and Authorized Healthcare Providers, and for obtaining any necessary consent from them for the provision and use of their information in connection with the Rocky Health Platform.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              <span className="text-base md:text-lg font-medium"> U.S. Users </span><br />
              Neither Rocky nor Authorized Healthcare Providers are “Covered Entities” as defined in HIPAA. That means the information collected through the Service by Rocky or Authorized Healthcare Providers is not subject to HIPAA. However, Rocky and its Authorized Healthcare Providers are committed to protecting the privacy and security of your Personal Data. We do not sell your Personal Data and we implement reasonable technical, physical, and administrative safeguards to keep it safe.
              The Service is only available to individuals in AL, AZ, AR, CO, CT, FL, GA, ID, IA, KS, KY, LA, ME, MD, MI, MN, MS, MO, MT, NE, ND, NJ, NY, OH, OK, OR, PA, SC, SD, TN, TX, UT, VA, WA, WV, WI, and WY.

            </p>

          </div>
          {/* Retention of Your Personal Data */}
          <div id="retention-of-your-personal-data" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Retention of Your Personal Data
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </p>
          </div>
          {/* Transfer of Your Personal Data */}
          <div id="transfer-of-your-personal-data" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Transfer of Your Personal Data
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
              Your information, including Personal Data, is processed at the
              Company’s operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </p>
          </div>
          {/* Disclosure of Your Personal Data */}
          <div id="security-of-your-personal-data" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Disclosure of Your Personal Data
            </div>
            <div className="text-[16px] mb-4  md:text-[18px] font-[400] leading-[160%]">
              <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-4 headers-font">
                Business Transactions
              </div>
              <p>
                If the Company is involved in a merger, acquisition or asset
                sale, Your Personal Data may be transferred. We will provide
                notice before Your Personal Data is transferred and becomes
                subject to a different Privacy Policy.
              </p>

              <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-4 headers-font">
                Law enforcement
              </div>
              <p>
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court
                or a government agency).
              </p>

              <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-4 headers-font">
                Other legal requirements
              </div>
              <p>
                The Company may disclose Your Personal Data in the good faith
                belief that such action is necessary to:
              </p>

              <ul className="space-y-2 list-disc ml-6 md:ml-8">
                <li>Comply with a legal obligation</li>
                <li>
                  Protect and defend the rights or property of the Company
                </li>
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </li>
                <li>
                  Protect the personal safety of Users of the Service or the
                  public
                </li>
                <li>Protect against legal liability</li>
              </ul>
            </div>
          </div>
          {/* Security of Your Personal Data */}
          <div id="security-of-your-personal-data" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Security of Your Personal Data
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </p>
            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Detailed Information on the Processing of Your Personal Data
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              The Service Providers We use may have access to Your Personal
              Data. These third-party vendors collect, store, use, process and
              transfer information about Your activity on Our Service in
              accordance with their Privacy Policies.
            </p>
          </div>
          {/* Analytics */}
          <div id="analytics" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Analytics
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
              We may use third-party Service providers to monitor and analyze
              the use of our Service.
            </p>
            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Google Analytics
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              Google Analytics is a web analytics service offered by Google that
              tracks and reports website traffic. Google uses the data collected
              to track and monitor the use of our Service. This data is shared
              with other Google services. Google may use the collected data to
              contextualize and personalize the ads of its own advertising
              network.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              You can opt-out of having made your activity on the Service
              available to Google Analytics by installing the Google Analytics
              opt-out browser add-on. The add-on prevents the Google Analytics
              JavaScript (ga.js, analytics.js and dc.js) from sharing
              information with Google Analytics about visits activity.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              For more information on the privacy practices of Google, please
              visit the Google Privacy & Terms web page:{" "}
              <a
                href="https://policies.google.com/privacy"
                className="duration-300 hover:text-gray-800 hover:underline"
              >
                https://policies.google.com/privacy
              </a>
            </p>
          </div>
          {/* Advertising */}
          <div id="advertising" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Advertising
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]  mb-6">
              We may use Service Providers to show advertisements to You to help
              support and maintain Our Service.
            </p>
            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Google AdSense & DoubleClick Cookie
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              Google, as a third party vendor, uses cookies to serve ads on our
              Service. Google’s use of the DoubleClick cookie enables it and its
              partners to serve ads to our users based on their visit to our
              Service or other websites on the Internet.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              You may opt out of the use of the DoubleClick Cookie for
              interest-based advertising by visiting the Google Ads Settings web
              page:{" "}
              <a
                href="http://www.google.com/ads/preferences/"
                className="duration-300 hover:text-gray-800 hover:underline"
              >
                http://www.google.com/ads/preferences/
              </a>
            </p>
          </div>
          {/* Email Marketing */}
          <div id="email-marketing" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Email Marketing
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400]">
              We may use Your Personal Data to contact You with newsletters,
              marketing or promotional materials and other information that may
              be of interest to You. You may opt-out of receiving any, or all,
              of these communications from Us by following the unsubscribe link
              or instructions provided in any email We send or by contacting Us.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We may use Email Marketing Service Providers to manage and send
              emails to You.
            </p>
            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Klavyo
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              Clavio is an email marketing sending service provided by The
              Rocket Science Group LLC.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              For more information on the privacy practices of Clavio, please
              visit their Privacy policy:{" "}
              <a
                href="https://mailchimp.com/legal/privacy/"
                className="duration-300 hover:text-gray-800 hover:underline"
              >
                https://mailchimp.com/legal/privacy/
              </a>
            </p>
          </div>
          {/* Payments */}
          <div id="payments" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Payments
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We may provide paid products and/or services within the Service.
              In that case, we may use third-party services for payment
              processing (e.g. payment processors).
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We will not store or collect Your payment card details. That
              information is provided directly to Our third-party payment
              processors whose use of Your personal information is governed by
              their Privacy Policy. These payment processors adhere to the
              standards set by PCI-DSS as managed by the PCI Security Standards
              Council, which is a joint effort of brands like Visa, Mastercard,
              American Express and Discover. PCI-DSS requirements help ensure
              the secure handling of payment information.
            </p>
            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Send Grid
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              Their Privacy Policy can be viewed at{" "}
              <a
                href="https://go.wepay.com/privacy-policy"
                className="duration-300 hover:text-gray-800 hover:underline"
              >
                https://go.wepay.com/privacy-policy
              </a>
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              When You use Our Service to pay a product and/or service via bank
              transfer, We may ask You to provide information to facilitate this
              transaction and to verify Your identity.
            </p>
          </div>
          {/* Usage, Performance and Miscellaneous */}
          <div
            id="usage,-performance-and-miscellaneous"
            className="mb-10 md:mb-14"
          >
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Usage, Performance and Miscellaneous
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We may use third-party Service Providers to provide better
              improvement of our Service.
            </p>
            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Invisible reCAPTCHA
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We use an invisible captcha service named reCAPTCHA. reCAPTCHA is
              operated by Google.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              The reCAPTCHA service may collect information from You and from
              Your Device for security purposes.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              The information gathered by reCAPTCHA is held in accordance with
              the Privacy Policy of Google:{" "}
              <a
                href="https://www.google.com/intl/en/policies/privacy/"
                className="duration-300 hover:text-gray-800 hover:underline"
              >
                https://www.google.com/intl/en/policies/privacy/
              </a>
            </p>

            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Children’s Privacy
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              Our Service does not address anyone under the age of 18. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 18. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 18 without verification of
              parental consent, We take steps to remove that information from
              Our servers.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              If We need to rely on consent as a legal basis for processing Your
              information and Your country requires consent from a parent, We
              may require Your parent’s consent before We collect and use that
              information.
            </p>

            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Links to Other Websites
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third party link, You will be
              directed to that third party’s site. We strongly advise You to
              review the Privacy Policy of every site You visit.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third party sites or
              services.
            </p>
            <div className="text-[22px] leading-[115%] tracking-[-0.01em] mb-6 headers-font">
              Changes to this Privacy Policy
            </div>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              “Last updated” date at the top of this Privacy Policy.
            </p>
            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] ">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>
          {/* Contact Us */}
          <div id="contact-us" className="mb-10 md:mb-14">
            <div className="text-[32px] md:text-[40px] leading-[115%] tracking-[-0.01em] md:tracking-[-0.02em] mb-6 headers-font">
              Contact Us
            </div>

            <p className="text-[16px] mb-4  md:text-[18px] leading-[160%] font-[400] mb-6">
              If you have any questions about this Privacy Policy, You can
              contact us:
            </p>
            <ul className="list-disc ml-6 md:ml-8">
              <li>
                <span className="font-[600] opacity-100 mt-4 mb-4">By email: </span>
                <a
                  href="mailto:contact@myrocky.ca"
                  className="hover:underline hover:text-gray-900 duration-300"
                >
                  contact@myrocky.ca
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Deskotp */}
        <ul className="hidden md:block w-[280px] space-y-3">
          {Content.map((text, index) => {
            const sectionId = text.toLowerCase().replace(/\s+/g, "-");
            return (
              <li
                key={index}
                className={`text-[18px] font-[400] leading-[140%] text-[#000000A6] hover:underline hover:font-[600] opacity-100 mt-4 mb-4 ${index === 0 ? "font-[600] opacity-100 mt-4 mb-4 text-black underline" : ""
                  }`}
              >
                <a href={`#${sectionId}`}>{text}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="md:hidden">
        <MoreQuestions buttonText="Start Free Consultation" />
      </div>
    </Section>
  );
}
