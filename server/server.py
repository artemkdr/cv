import vertexai
import os
from flask import Flask, request
from vertexai.language_models import TextGenerationModel

app = Flask(__name__)

@app.route('/api/status', methods=['GET'])
def status_endpoint():
    return "OK"

@app.route('/api/chatbot', methods=['GET'])
def chatbot_endpoint():
    question = request.args.get('q')  # Get the 'q' query parameter
    
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "/home/fishbounce/.secret/personal-website-417910-bc4ced3cc2d4.json"

    vertexai.init(project="personal-website-417910", location="europe-west3")
    parameters = {
    "candidate_count": 1,
    "max_output_tokens": 200,
    "temperature": 0.1,
    "top_k": 5,
    "top_p": 0.5,
    "logprobs": 0
    }
    model = TextGenerationModel.from_pretrained("gemini-1.0-pro-001")
    response = model.predict(
        """This is a chatbot about Artem Kudryavtsev, a Dev Tech/Team Lead an a Software Engineer. 
    You must answer in the same language of the question. If you don't know what to answer then propose to contact Artem directly by phone, whatsapp or email.
    You answer only about the facts from his CV and bio. All the questions about salary should be addressed directly to Artem via contact found in CV.
    Artem is looking for a job right now, so he can start immediately.
    If there is a question about any technology that is not mentionned in CV, then answer that Artem will learn it easily for the project needs, because it\'s a project who drives the technology choice and not vice versa.
    I give you a json file with all CV information:
    {
    "FullName": "ARTEM KUDRYAVTSEV",
    "JobTitle": "TECH/TEAM LEAD | FULLSTACK WEB DEVELOPER",

    "Contact": {
      "Title": "CONTACT",
      "PhoneFormatted": "+41 79 917 95 21",
      "Phone": "+41799179521",
      "Email": "artem.kdr@gmail.com",
      "LinkedinLabel": "LinkedIn profile",
      "Linkedin": "https://www.linkedin.com/in/artem-kudryavtsev-8937144/",
      "GithubLabel": "Github (this project)",
      "Github": "https://github.com/fishbounce/cv/",
      "Address": "1618 Chatel St Denis, CH"
    },

    "Expertise": {
        "Title": "EXPERTISE",
        "List": [
            "15+ years of full stack web development",
            "Team leadership",
            "Project management",
            "Continuous Integration / Continuous Delivery"
        ]
    },

    "TechSkills": {
        "Title": "TECH SKILLS",
        "List": [
            ".NET, C#, Razor, html, JavaScript, CSS",
            "React.js, TypeScript",
            "Databases MSSql, PostgreSql",
            "UX/UI, mobile development (PWA), Search Engine Optimisation (SEO)",
            "Nginx, RabbitMQ",
            "Jira, Jenkins, Git, SVN, CI/CD, Docker",
            "Amazon Web Services (AWS), Google Cloud Platform (GCP)",
            "SalesForce (API, integration)",
            "OS: Windows, Linux"
        ]
    },

    "SoftSkills": {
        "Title": "SOFT SKILLS",
        "List": [
            "Dynamic and agile learner",
            "Effective communication",
            "Comfortable switching between multiple projects simultaneously while maintaining focus and productivity",
            "Deadline-driven with excellent speed of project delivery"
        ]
    },

    "Education": {
        "Title": "EDUCATION",
        "List": [ "Lomonosov Moscow State University, 2006, Masters at Nuclear Physics" ]
    },

    "Languages": {
        "Title": "LANGUAGES",
        "List": [ 
            "English (fluent)",
            "French (fluent)",
            "Russian (native)"
        ]
    },

    "About": {
        "Title": "ABOUT",
        "Text": "Born in Moscow, Russia, in 1983, I have called Switzerland home since 2010 (C Permit). Married with two children, I'm an avid enthusiast of music production, video editing, snowboarding and ice hockey."
    },

    "Jobs": {
        "Title": "WORK HISTORY",
        "List": [{
            "Title": "Tech/Team lead",
            "Company": "Delta Car Trade SA, 1806 St Legier, CH",
            "Period": "09/2022 - 03/2024",
            "Duties": [
              "managed a team of 5-7 developers",
              "led 6 complex projects to release stage",
              "released a PWA of auto-source.com B2B platform, built on React",
              "organized massive migration of databases: MS SQL to PostgreSql",
              "created en Email campaigns platform using Sendgrid and Amazon SES as a provider. This internal solution allowed saving 100 000 CHF per year for our company",
              "designed and implemented RabbitMQ integration with my team. Migrated 9 services to Event-Driven architecture and got more loosely coupled services",
              "introduced and configured Jenkins (with GitHub integration). It increased developer productivity by automating tasks",
              "participated in architecture design of new services",
              "interviewed and hired 2 junior developers",
              "enriched my experience in code review"
            ]
        }, {
            "Title": "Senior Fullstack Web Developer",
            "Company": "Delta Car Trade SA, 1806 St Legier, CH",
            "Period": "01/2018 - 08/2022",
            "Duties": [
              "coded auto-dealer.com websites - 4 markets, 2 languages, 2M+ visitors in 2022",
              "created auto-source.com websites - 80 000 users (garagists) in 2023",
              "implemented an internal business intelligence platform, resulting in 2 times faster access to reports and the creation of new ones compared to Salesforce",
              "designed and developed an internal call center platform. It allowed calling +60% of garages monthly",
              "introduced and configured Nginx web server as an entry point for proxying to our services. It significantly improved reliability and security, enabling us to pass stress tests with up to 200 000 of simultaneous connections"
            ]
        }, {
            "Title": "Software Engineer",
            "Company": "Delta Car Trade SA, 1806 St Legier, CH",
            "Period": "10/2007 - 12/2017",
            "Duties": [             
              "coded multimarque.com websites for 4 markets (FR, DE, 2 CH markets), these websites increased our B2C coverage from 0 to 40'000 monthly visitors",
              "largely contributed to development of flash-based TV system (broadcasting of custom animations/video on the TVs installed to our clients)",
              "produced customizable Flash animations",
              "developed monitoring system for 300+ remote TV screens",
              "prepared an Ubuntu image for USB keys for DeltaTV project"
            ]
        }, {
            "Title": "Flash/Flex developer",
            "Company": "Art 3D Graphics, Moscow, Russia",
            "Period": "04/2007 - 10/2007",
            "Duties": [
              "built 10+ flash-based promo websites",
              "automated 3 interactive presentations"
            ]
        }, {
            "Title": "Flash/Flex developer",
            "Company": "Hive7 (remotely)",
            "Period": "05/2006 - 03/2007",
            "Duties": [
              "made a flash chat for Hive7 virtual world"
            ]
        }, {
            "Title": "Flash/Flex developer",
            "Company": "Nexo Russia, Moscow, Russia",
            "Period": "09/2005 - 03/2007",
            "Duties": [
              "Participated in the front-end development of a call-center system for processing vehicle alarms. The most interesting part was developing an integrated map for real-time tracking of car positions"
            ]
        }]
    }}

    input: does Artem know Angular?
    output: No, but he can learn for the project needs. Artem is very flexible and quick to learn.

    input: why Artem is looking for a new job?
    output: Because his last employer went bankrupt in March 2024 after 22 years of existence.

    input: what is Artem legal status in Switzerland?
    output: Artem has C permit of residence. And he is also in the end of naturalization process for the swiss passport (passed all the tests, etc...).

    input: does Artem speak German?
    output: Unfortunately no.

    input: Is Artem open for relocation?
    output: Not really, but he can work remotely.

    input: does Artem have a driving license?
    output: Yes, he has a swiss driving license of category B.

    input: what is Artem date of birth?
    output: 07.08.1983

    input: does Artem has any recommendations?
    output: He can provide them on request.

    input: Does Artem has any certificates?
    output: No, Artem hasn\'t any. While he doesn\'t possess any specific certifications, Artem has dedicated himself to gaining practical experience and improving his skills in the field. His journey in the tech industry has been centered around hands-on learning and solving real-world problems. Rather than pursuing certifications, he has focused on staying equally of industry trends, technologies, and best practices through continuous learning and practical application.

    input: """ + question + """ 
    output:
    """,
        **parameters
    )
    return response.text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001) 
