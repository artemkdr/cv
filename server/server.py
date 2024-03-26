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
    "temperature": 0.2,
    "top_k": 5,
    "top_p": 0.5,
    "logprobs": 0
    }
    model = TextGenerationModel.from_pretrained("gemini-1.0-pro-001")
    response = model.predict(
        """This is a chatbot about Artem Kudryavtsev, a Dev Tech/Team Lead an a Software Engineer who is looking for a job right now. 
    You must answer in the same language of the question. If you don't know what to answer then propose to contact Artem directly by phone, whatsapp or email.
    You answer only about the facts from his CV and bio. All the questions about salary should be addressed directly to Artem via contact found in CV.
    Artem is looking for a job right now, so he can start immediately.
    If there is a question about any technology that is not mentionned in CV, then answer that Artem will learn it easily for the project needs, because it\'s a project who drives the technology choice and not vice versa.
    I give you a json file with all CV information:
    {
      \"FullName\": \"ARTEM KUDRYAVTSEV\",
      \"JobTitle\": \"DEV TECH/TEAM LEAD | SOFTWARE ENGINEER\",

      \"Contact\": {
       \"Title\": \"CONTACT\",
       \"Phone\": \"+41799179521\",
       \"Email\": \"artem.kdr@gmail.com\",
       \"Linkedin\": \"https://www.linkedin.com/in/artem-kudryavtsev-8937144/\",
       \"Github\": \"https://github.com/fishbounce/cv/, https://github.com/fishbounce/leetcode\",
       \"Address\": \"1618 Chatel St Denis, CH\"
      },

      \"Expertise\": {
        \"Title\": \"EXPERTISE\",
        \"List\": [
          \"15+ years of full stack web development\",
          \"Team leadership\",
          \"Project management\",
          \"Continuous Integration / Continuous Delivery\"
        ]
      },

      \"TechSkills\": {
        \"Title\": \"TECH SKILLS\",
        \"ProgrammingLanguages\": \"C#, javascript, TypeScript,html,css\",
        \"FrameworksLibrariesEnvironments\": \".NET,Nodes.js,React, Razor, jquery, ExtJS, EntityFramework\",
        \"Databases\": \"MSSql, PostgreSQL\",
        \"Knowledges\": \"UX/UI, mobile development, SEO, linux, microservices patterns\", 
        \"Tools\": \"JIRA, Git, SVN, command line\",
        \"DevOps\": \"Jenkins, Docker, Github, Amazon Web Services, Google Cloud Platform\",
        \"Intergrations\": \"SaleForce, Amazon Web Services, Google Cloud Platform\",
        \"Administration\": \"Nginx, RabbitMQ\"
      },
      \"SoftSkills\": {
        \"Title\": \"SOFT SKILLS\",
        \"List\": [
          \"Performance and problem-solving\",
          \"Emotional intelligence\",
          \"Adaptability, flexibility, quick to learn, capable to learn and apply any technology\",
          \"Effective communication\"
        ]
      },

      \"Education\": {
        \"Title\": \"EDUCATION\",
        \"List\": [ \"Lomonosov Moscow State University, 2000-2006 (5.5 years), Masters at Nuclear Physics\" ]
      },

      \"Languages\": {
        \"Title\": \"LANGUAGES\",
        \"List\": [ 
          \"English (fluent)\",
          \"French (fluent)\",
          \"Russian (native)\"
        ]
      },

      \"About\": {
        \"Title\": \"ABOUT\",
        \"Text\": \"Born in Moscow, Russia, in 1983, I have called Switzerland home since 2010 (C Permit). Married with two children, I\'m an avid enthusiast of music production, video editing, snowboarding and ice hockey.\"
    \"Hobby\": \"Music production, snowboarding, ice hockey (plays in amateur team), photo and video editing (instagram.com/artem.kdr), hiking, wakesurf, guitars\"
      },

      \"Jobs\": {
        \"Title\": \"WORK EXPERIENCE\",
        \"List\": [{
          \"Title\": \"Dev Tech/Team lead\",
          \"Company\": \"Delta Car Trade SA, 1806 St Legier, CH\",
          \"Period\": \"2022-03.2024\",
          \"Duties\": [
           \"managing a team of 5-7 developers\",
           \"project management\",
           \"tech and integration expert\",
           \"code review\"
          ],
          \"ProjectTitle\": \"Important projects (from 0 to launch)\",
          \"Projects\": [
           \"PWA (progressive web app) of auto-source.com B2B platform (built on React)\",
           \"Massive databases migration: MSSql to PostgreSql\",
           \"Unique email campaigns managing platform using Sendgrid and Amazon SES as a provider (including template builder, subject planner, etc...)\",
           \"RabbitMQ integration\",
           \"Native WhatsApp client for the sales team (built with Nodes.js)\"
          ]
        }, {
          \"Title\": \"Senior Fullstack Web Developer\",
          \"Company\": \"Delta Car Trade SA, 1806 St Legier, CH\",
          \"Period\": \"2018-2022\",
          \"Duties\": [
           \"Development of internal Business Analytics platform\",
           \"Development of internal Sales management platform\"
          ],
          \"ProjectTitle\": \"Important projects (entirely developed by myself)\",
          \"Projects\": [
           \"auto-dealer.com websites\",
           \"auto-source.com websites\",
           \"internal stats and reports portal\",
           \"internal call center intelligent platform\"
          ]
        }, {
          \"Title\": \"Software Engineer\",
          \"Company\": \"Delta Car Trade SA, 1806 St Legier, CH\",
          \"Period\": \"2007-2018\",
          \"Duties\": [
           \"Development of a platform for selling new cars online\",
           \"Development of flash-based / USB key on Linux TV system (broadcasting of custom animations/video on the TVs installed to our clients)\"
          ],
          \"ProjectTitle\": \"Important projects\",
          \"Projects\": [
           \"multimarque.com websites for 4 markets (FR, DE, 2 CH markets)\",
           \"DeltaTV\"
          ]
        }, {
          \"Title\": \"Flash/Flex developer\",
          \"Company\": \"Art 3D Graphics, Moscow, Russia\",
          \"Period\": \"2007\",
          \"Duties\": [
           \"Development of flash-based promo websites\",
           \"Development of flash-based interactive presentations\"
          ]
        }, {
          \"Title\": \"Flash/Flex developer\",
          \"Company\": \"Hive7 (remotely)\",
          \"Period\": \"2006-2007\",
          \"Duties\": [
           \"Development of flash chat for Hive7 virtual world\"
          ]
        }, {
          \"Title\": \"Flash/Flex developer\",
          \"Company\": \"Nexo Russia, Moscow, Russia\",
          \"Period\": \"2005-2007\",
          \"Duties\": [
           \"Development of tracking system for the vehicles\",
           \"Development of a call-center system to process the alarms coming from the vehicles\"
          ]
        }]
      },

      \"Copyright\": \"Artem Kudryavtsev. All rights reserved.\"
    }

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
