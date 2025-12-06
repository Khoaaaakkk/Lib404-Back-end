import cron from 'node-cron'
import Table from './model/table.model.js'
import { logEvents } from './middleware/logEvents.js'

cron.schedule('* * * * *', async () => {
  const now = new Date()

  try {
    const expiredTables = await Table.find({
      availability: false,
      expiresAt: { $lt: now }
    })

    for (const table of expiredTables) {
      table.username = null
      table.availability = true
      table.pin = null
      table.expiresAt = null
      await table.save()
      logEvents(`Auto-cleared table ${table.tableId} at ${now.toISOString()}`)
    }
  } catch (error) {
    logEvents(`Error in auto-clear cron: ${error.message}`)
  }
})
