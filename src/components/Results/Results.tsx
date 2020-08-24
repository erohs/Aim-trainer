import React from 'react';
import './style/Results.css';
import { IResultsProps } from './interfaces/IResultsProps';
import { Settings } from '../GameSettings/Settings';

class Results extends React.Component<IResultsProps> {
    render() {
        return (
            <div className="results">
                <div className="results--card">
                    <h3 className="results--card-header">SCORE</h3>
                    <div className="results--card-rows">
                        <div className="results--card-content">
                            {this.props.results.score}
                        </div>
                        <div className="results--card-row">
                            {this.props.results.combo}&#215; Combo
                        </div>
                    </div>
                </div>
                <div className="results--card">
                    <h3 className="results--card-header">TARGETS</h3>
                    <div className="results--card-contents">
                        <div className="results--card-content">{this.props.results.targets.total}</div>
                        <div className="results--card-rows">
                            <div className="results--card-row">
                                {this.props.results.targets.hits} Hit
                            </div>
                            <div className="results--card-row">
                                {this.props.results.targets.missed} Missed
                            </div>
                            <div className="results--card-row">
                                {this.props.results.targets.perSecond} Per Second
                            </div>
                        </div>
                    </div>
                </div>
                <div className="results--card">
                    <h3 className="results--card-header">CLICKS</h3>
                    <div className="results--card-contents">
                        <div className="results--card-content">{this.props.results.clicks.total}</div>
                        <div className="results--card-rows">
                            <div className="results--card-row">
                                {this.props.results.clicks.hits} Hit
                            </div>
                            <div className="results--card-row">
                                {this.props.results.clicks.missed} Missed
                            </div>
                            <div className="results--card-row">
                                {this.props.results.clicks.perSecond} Per Second
                            </div>
                        </div>
                    </div>
                </div>
                <div className="results--card">
                    <h3 className="results--card-header">EFFICIENCY</h3>
                    <div className="results--card-rows">
                        <div className="results--card-content">
                            {this.props.results.targets.efficiency * 100}%
                        </div>
                        <div className="results--card-row">
                            {this.props.results.targets.hits}/{this.props.results.targets.total} Total
                        </div>
                    </div>
                </div>
                <div className="results--card">
                    <h3 className="results--card-header">ACCURACY</h3>
                    <div className="results--card-rows">
                        <div className="results--card-content">
                            {this.props.results.clicks.accuracy * 100}%
                        </div>
                        <div className="results--card-row">
                            {this.props.results.clicks.hits}/{this.props.results.clicks.total} Total
                        </div>
                    </div>
                </div>
                <div className="results--card">
                    <h3 className="results--card-header">SETTINGS</h3>
                    <div className="results--card-contents">
                        <div className="results--card-rows">
                            <div className="results--card-setting">
                                <div className="results--card-row-setting-name">Gamemode</div>
                                <div className="results--card-row-setting-value">
                                    {Settings["gamemode"].types[Settings["gamemode"].values.indexOf(this.props.results.settings.gamemode)]}
                                </div>
                            </div>
                            <div className="results--card-setting">
                                <div className="results--card-row-setting-name">Difficulty</div>
                                <div className="results--card-row-setting-value">
                                    {Settings["difficulty"].types[Settings["difficulty"].values.indexOf(this.props.results.settings.difficulty)]}
                                </div>
                            </div>
                            <div className="results--card-setting">
                                <div className="results--card-row-setting-name">Sizes</div>
                                <div className="results--card-row-setting-value">
                                    {Settings["sizes"].types[Settings["sizes"].values.indexOf(this.props.results.settings.sizes)]}
                                </div>
                            </div>
                            <div className="results--card-setting">
                                <div className="results--card-row-setting-name">Duration</div>
                                <div className="results--card-row-setting-value">
                                    {Settings["duration"].types[Settings["duration"].values.indexOf(this.props.results.settings.duration)]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Results;
