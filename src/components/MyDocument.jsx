import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748b',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 10,
  },
  mainGridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 540,
    margin: '0 auto',
  },
  subGrid: {
    width: '33.33%',
    padding: 4,
  },
  subGridInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.33%',
    padding: 2,
  },
  cellInner: {
    backgroundColor: '#cbd5e1',
    padding: 4,
    height: 50,
    border: '1px solid #94a3b8',
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 7,
    textAlign: 'center',
    hyphens: 'auto',
  },
  mainCell: {
    backgroundColor: '#94a3b8',
    fontWeight: 'bold',
  },
  centerCell: {
    backgroundColor: '#fef08a',
    fontWeight: 'bold',
  },
})

// PDF Document Component - export this to use in your app
export default function MyDocument({ gridData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{gridData?.title}</Text>
        <Text style={styles.paragraph}>{gridData?.description}</Text>
        <View style={styles.mainGridContainer}>
          {gridData?.grids?.map((grid, ind) => (
            <View key={`grid-${ind + 1}`} style={styles.subGrid}>
              <View style={styles.subGridInner}>
                {grid.map((task) => {
                  const isMainCenter =
                    task.id.startsWith('main') && task.slot === 'middle-center'
                  const isMainOrCenter =
                    task.id.startsWith('main') || task.slot === 'middle-center'

                  return (
                    <View key={task.id} style={styles.cell}>
                      <View
                        style={[
                          styles.cellInner,
                          isMainCenter && styles.centerCell,
                          isMainOrCenter && !isMainCenter && styles.mainCell,
                        ]}
                      >
                        <Text style={styles.cellText}>{task.text}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Want to create your own grid? Go to myharada.netlify.app for free
          unlimited grids!
        </Text>
      </Page>
    </Document>
  )
}
