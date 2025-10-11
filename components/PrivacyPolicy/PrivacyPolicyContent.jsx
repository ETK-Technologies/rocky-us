import PrivacyPolicyHeader from "@/components/PrivacyPolicy/PrivacyPolicyHeader";
import PrivacyPolicyIntro from "@/components/PrivacyPolicy/PrivacyPolicyIntro";
import PrivacyPolicyNav from "@/components/PrivacyPolicy/PrivacyPolicyNav";
import InterpretationAndDefinitions from "@/components/PrivacyPolicy/InterpretationAndDefinitions";
import Section from "@/components/utils/Section";
import TypesOfDataCollected from "@/components/PrivacyPolicy/TypesOfDataCollected";
import UseOfYourPersonalData from "@/components/PrivacyPolicy/UseOfYourPersonalData";
import HealthcareServices from "@/components/PrivacyPolicy/HealthcareServices";
import RetentionOfYourPersonalData from "@/components/PrivacyPolicy/RetentionOfYourPersonalData";
import TransferOfYourPersonalData from "@/components/PrivacyPolicy/TransferOfYourPersonalData";
import SecurityOfYourPersonalData from "@/components/PrivacyPolicy/SecurityOfYourPersonalData";
import Analytics from "@/components/PrivacyPolicy/Analytics";
import Advertising from "@/components/PrivacyPolicy/Advertising";
import EmailMarketing from "@/components/PrivacyPolicy/EmailMarketing";
import Payments from "@/components/PrivacyPolicy/Payments";
import UsagePerformanceMiscellaneous from "@/components/PrivacyPolicy/UsagePerformanceMiscellaneous";
import ContactUs from "@/components/PrivacyPolicy/ContactUs";
import MoreQuestions from "@/components/MoreQuestions";

const PrivacyPolicyContent = () => {
  return (
    <Section>
      <PrivacyPolicyHeader />
      <div className="md:flex gap-[120px]">
        <div className="md:w-[784px]">
          <PrivacyPolicyIntro />
          {/* Mobile */}
          <PrivacyPolicyNav variant="mobile" />

          <InterpretationAndDefinitions />

          <TypesOfDataCollected />

          <UseOfYourPersonalData />

          <HealthcareServices />

          <RetentionOfYourPersonalData />

          <TransferOfYourPersonalData />

          <SecurityOfYourPersonalData />

          <Analytics />

          <Advertising />

          <EmailMarketing />

          <Payments />

          <UsagePerformanceMiscellaneous />
          <ContactUs />
        </div>
        {/* Deskotp */}
        <PrivacyPolicyNav variant="desktop" />
      </div>
      <div className="md:hidden">
        <MoreQuestions buttonText="Start Free Consultation" />
      </div>
    </Section>
  );
};

export default PrivacyPolicyContent;
