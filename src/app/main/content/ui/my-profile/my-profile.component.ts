import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

//ML
//import { SkillsService } from './skills.service';

@Component({
    selector   : 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls  : ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit
{
    form: FormGroup;
    formErrors: any;


    //begin ML

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;


    //for Accordion
    step = 0;

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }


    //==========================
    //
    //for CURRENT SKILLS
    //
    //==========================
    //form group per gruppo di skills
    formCurrentSkills: FormGroup;
    formAspirationalSkills: FormGroup;



    currentSkillsInputItemArray: Array<FormControl>;
//    aspirationalSkills = [];
    options = ['C++', 'Java', 'Angular', 'Oracle', 'Credit Risk', 'Problem Solving', 'SAS', 'Global Markets', 'Front Office', 'SCRUM', 'Agile development', 'Python' ];
    myCurrentSkillsControl: FormControl = new FormControl();
    myAspirationalSkillsControl: FormControl = new FormControl();

    currentSkillsFilteredOptions: Observable<string[]>;
    aspirationalSkillsFilteredOptions: Observable<string[]>;

   
    addCurrentSkill(){
        //prendo i current skills dal FormArray nel FormGroup e gli aggiungo un nuovo elemento
        let skills = <FormArray>this.currentSkills;
        //lo faccio con una semplice push e lo costruisco tramite il formbuilder
        skills.push(this.formBuilder.group({
            skillName: [''],
            proficiency: ['']
        }));

    }
    removeCurrentSkill(i){

        let skills = <FormArray>this.currentSkills;
        skills.removeAt(i);
    }

    addAspirationalSkill(){
        let skills = <FormArray>this.aspirationalSkills;
        skills.push(this.formBuilder.group({
            skillName: [''],
            proficiency: ['']
        }));

    }
    removeAspirationalSkill(i){
        let skills = <FormArray>this.aspirationalSkills;
        skills.removeAt(i);
    }


    //==========================
    //
    //for ASPIRATIONAL SKILLS
    //
    //==========================




    //end ML

    constructor(private formBuilder: FormBuilder)
    {
        this.formErrors = {
            company   : {},
            firstName : {},
            lastName  : {},
            address   : {},
            address2  : {},
            city      : {},
            state     : {},
            postalCode: {}
        };
    }

    //SKILLS
    filter(val: string): string[] 
    {
      //console.log("in filter.. "+ val);
      //questo e' l'operazione di filtering on a typescript array. The argument is the filtering criteria, as anonymous function.
      return this.options.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    //property for getSkills
    get currentSkills(): FormArray { return this.formCurrentSkills.get('skills') as FormArray; }    
    get aspirationalSkills(): FormArray { return this.formAspirationalSkills.get('skills') as FormArray; }

    ngOnInit()
    {
        this.currentSkillsInputItemArray = new Array<FormControl>();
        
      //form group SKILLS ------- 
        this.formCurrentSkills = this.formBuilder.group({
            skills: this.formBuilder.array([
                this.formBuilder.group({
                    skillName: [''],
                    proficiency: ['']
                })
            ])
        });


        for (var index = 0; index < this.currentSkillsInputItemArray.length; index++) {
            let a:FormArray = this.formCurrentSkills.get('skills') as FormArray;

            this.currentSkillsInputItemArray.push(a.at(index).get('skillName') as FormControl);
            
        }

        console.log("Array of Form Control: " + this.currentSkillsInputItemArray);

        

//        console.log(this.formCurrentSkills);

        this.formAspirationalSkills = this.formBuilder.group({
            skills: this.formBuilder.array([
                this.formBuilder.group({
                    skillName: [''],
                    proficiency: ['']
                })
            ])
        });



        let skillsArray: FormArray = this.formCurrentSkills.get('skills') as FormArray;
        //console.log(skillsArray);
        for (var index = 0; index < skillsArray.length; index++) {
            var element:FormControl = skillsArray.at(index).get('skillName') as FormControl;
            console.log(element);
            element.valueChanges.startWith(null).map(val => val ? this.filter(val) : this.options.slice());
        }



        this.currentSkillsFilteredOptions = this.myCurrentSkillsControl.valueChanges.startWith(null).map(val => val ? this.filter(val) : this.options.slice());
        this.aspirationalSkillsFilteredOptions = this.myAspirationalSkillsControl.valueChanges.startWith(null).map(val => val ? this.filter(val) : this.options.slice());

      // ==============


        this.form = this.formBuilder.group({
            company   : [
                {
                    value   : 'Google',
                    disabled: true
                }, Validators.required
            ],
            firstName : ['', Validators.required],
            lastName  : ['', Validators.required],
            address   : ['', Validators.required],
            address2  : ['', Validators.required],
            city      : ['', Validators.required],
            state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });



        //begin ML
            this.firstFormGroup = this.formBuilder.group({
              firstCtrl: ['Marco Lembo', Validators.required],
              divisionCtrl: [{value: 'SJSF 4', disabled: true}]
            });
            this.secondFormGroup = this.formBuilder.group({
              secondCtrl: ['', Validators.required]
            });

        // end ML
    }

    onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }
}
