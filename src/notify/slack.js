const config = require('config');
const Slack = require('node-slack');

class SlackNotifier{
	constructor(){
		try{
			console.log('Got Slack URL:', config.get('slack_url'));
			this.slack = new Slack(config.get('slack_url'));
		}catch(e){
			console.error('Could not initialize Slack', e);
			this.slack = null;
		}
	}

	notify(item){
		if(!this.slack){
			return;
		}

		console.log('Text:', item.text);
		return this.slack.send({
			text: item.text,
			attachments: [item],
		}).then(() => {
			console.log('Slack message sent');
		}, (e) => {
			console.error(e);
		});
	}
}

module.exports = SlackNotifier;
