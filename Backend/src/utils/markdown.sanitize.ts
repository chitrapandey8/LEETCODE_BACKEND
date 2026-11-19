import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import TurnDownService from 'turndown';
import logger from '../config/logger.config';


export async function sanitizeMarkDown(markdown:string):Promise<string> {
    if(!markdown || typeof markdown !== "string"){
        return "";
    }

    try{
      const convertedhtml = await marked.parse(markdown);
      
      const SanitizeHtml = sanitizeHtml(convertedhtml, {
        allowedTags:sanitizeHtml.defaults.allowedTags.concat(["img","pre","code"]),
        allowedAttributes:{
            ...sanitizeHtml.defaults.allowedAttributes,
            "img":["src","alt","title"],
            "code":["class"],
            "pre":["class"],
            "a":["href","target"]
        },
        allowedSchemes:["http","https"],
        allowedSchemesByTag:{
            "img":["http", "https"],
        }
      });

      const tds = new TurnDownService();
      return tds.turndown(SanitizeHtml);
    }catch(error){
      logger.error("Error sanitizing markdown", error);
      return "";
    }
}