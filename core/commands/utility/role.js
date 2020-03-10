module.exports = {
	name: 'role',
	aliases: ['rl'],
	description: 'Shows all information for a given role',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		const serialized = role.permissions.serialize();
		const permissions = Object.keys(serialized).filter(perm => serialized[perm]);

		message.channel.send(new Yuki.MessageEmbed()
			.setColor(role.hexColor)
			.setThumbnail(`https://dummyimage.com/512/${role.hexColor.slice(1)}/&text=%20`)
			.addField(':mag: Name:', Yuki.util.sendCode(role.name, { code: 'js' }), true)
			.addField(':id: ID:', Yuki.util.sendCode(role.id, { code: 'js' }), true)
			.addField(':art: Color:', Yuki.util.sendCode(role.hexColor.toUpperCase(), { code: 'js' }), true)
			.addField(':person_raising_hand: Mentionable:', Yuki.util.sendCode(role.mentionable ? 'Yes' : 'No', { code: 'js' }), true)
			.addField(':pushpin: Hoisted:', Yuki.util.sendCode(role.hoist ? 'Yes' : 'No', { code: 'js' }), true)
			.addField(':straight_ruler: Position:', Yuki.util.sendCode(`${role.position}/${message.guild.roles.cache.size}`, { code: 'js' }), true)
			.addField(':closed_lock_with_key: Permissions:', Yuki.util.sendCode(permissions.join('\n') || 'None', { code: 'js' }))
			.setFooter(`Currently ${role.members.size} member(s) using this role`)
		);
	}
};